import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";
import { parseChatMessages } from "@/lib/chat-request";

const MAX_MESSAGES = 30;
const MAX_CHARS = 2000;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Direct OpenAI key (e.g. Vercel) takes precedence; otherwise use Lovable AI Gateway.
        const openaiKey = process.env["OPENAI_API_KEY"];
        const apiKey = openaiKey ?? process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "Assistant is not configured on this deployment. Please contact StellarOne directly while the site owner restores chat access." }, { status: 503 });

        let messages: UIMessage[];
        try {
          messages = parseChatMessages(await request.json());
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }
        if (messages.length === 0 || messages.length > MAX_MESSAGES) {
          return Response.json({ error: "This conversation is too long. Please use the contact form." }, { status: 400 });
        }
        const tooLong = messages.some((m) =>
          m.parts.some((p) => p.type === "text" && p.text.length > MAX_CHARS),
        );
        if (tooLong) return Response.json({ error: "Please keep messages shorter." }, { status: 400 });

        const { createResponsesCall } = await import("@/server/ai/responses");
        const { ASSISTANT_INSTRUCTIONS } = await import("@/server/ai/assistant-prompt");
        const { getAiAccessPause } = await import("@/server/ai/access-state");
        try {
          const pause = process.env["SUPABASE_SERVICE_ROLE_KEY"] ? await getAiAccessPause() : null;
          if (pause) return Response.json({ error: pause.message }, { status: pause.status });
        } catch {
          return Response.json({ error: "Unable to check assistant availability. Please send your enquiry to our team." }, { status: 503 });
        }
        const modelMessages = await convertToModelMessages(messages);
        return createResponsesCall(
          request,
          openaiKey
            ? { baseURL: "https://api.openai.com/v1", apiKey, model: process.env["OPENAI_MODEL"] ?? "gpt-4.1-mini", direct: true, reasoning: false }
            : { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" },
          modelMessages,
          ASSISTANT_INSTRUCTIONS,
        ).response();
      },
    },
  },
});
