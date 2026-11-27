import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import { gatewayFailure, isAccessPause, streamedGatewayFailure, type GatewayFailure } from "./gateway-failure";
import { pauseAiAccess } from "./access-state";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.ts";

export function createResponsesCall(
  request: Request,
  config: { baseURL: string; apiKey: string; model: string },
  messages: ModelMessage[],
  instructions?: string,
) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  let failure: GatewayFailure | null = null;
  let resolveUpstream: () => void = () => {};
  const upstreamReady = new Promise<void>((resolve) => { resolveUpstream = resolve; });
  const markFailure = async (next: GatewayFailure) => {
    failure = next;
    if (isAccessPause(next.status)) await pauseAiAccess(next.status, next.message);
  };
  const provider = createOpenAI({
    baseURL: `${config.baseURL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
    apiKey: config.apiKey,
    headers: { "Lovable-API-Key": config.apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      try {
        const response = await runIdFetch.fetch(input, init);
        if (!response.ok) {
          const body: unknown = await response.clone().json().catch(() => null);
          await markFailure(gatewayFailure(response.status, body));
          resolveUpstream();
          return response;
        }
        resolveUpstream();
        if (!response.body) return response;
        // Observe split native SSE frames without buffering text before forwarding it.
        const decoder = new TextDecoder();
        let pending = "";
        const body = response.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
          async transform(chunk, controller) {
            pending += decoder.decode(chunk, { stream: true });
            const frames = pending.split(/\r?\n\r?\n/);
            pending = frames.pop() ?? "";
            for (const frame of frames) {
              const data = frame.split(/\r?\n/).filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart()).join("\n");
              if (!data || data === "[DONE]") continue;
              let event: unknown;
              try { event = JSON.parse(data); } catch { continue; }
              const next = streamedGatewayFailure(event);
              if (next) await markFailure(next);
            }
            controller.enqueue(chunk);
          },
        }));
        return new Response(body, { status: response.status, headers: response.headers });
      } catch (error) {
        failure ??= { status: request.signal.aborted ? 499 : 502, message: request.signal.aborted ? "Request stopped." : "The assistant could not reach its service. Please send your enquiry to our team." };
        resolveUpstream();
        throw error;
      }
    },
  });
  const reasoning = config.model !== "openai/chat-latest";
  const result = streamText({
    model: provider.responses(config.model),
    // AI SDK 6 lacks `instructions`: rename this key to `system` there.
    ...(instructions ? { instructions } : {}),
    messages,
    abortSignal: request.signal,
    // A fresh user action is required after every failed or refused request.
    maxRetries: 0,
    onError: () => { resolveUpstream(); },
    providerOptions: {
      openai: {
        store: false,
        ...(reasoning
          ? {
              forceReasoning: true,
              reasoningEffort: "medium",
              reasoningSummary: "auto",
              include: ["reasoning.encrypted_content"],
            }
          : {}),
      },
    },
  });
  return {
    result,
    response: async () => {
      const response = result.toUIMessageStreamResponse({ sendReasoning: true, onError: () => failure?.message ?? "The assistant could not complete this request. Please send your enquiry to our team." });
      await upstreamReady;
      if (failure) {
        await response.body?.cancel().catch(() => {});
        return Response.json({ error: failure.message }, { status: failure.status });
      }
      return withLovableAiGatewayRunIdHeader(response, runIdFetch, { "Cache-Control": "no-cache, no-transform" });
    },
  };
}
