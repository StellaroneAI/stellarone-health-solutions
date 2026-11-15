import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";

const MAX_MESSAGES = 30;
const MAX_CHARS = 2000;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "Assistant is not configured." }, { status: 500 });

        let messages: UIMessage[];
        try {
          const body = (await request.json()) as { messages?: UIMessage[] };
          messages = Array.isArray(body.messages) ? body.messages : [];
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
        const modelMessages = await convertToModelMessages(messages);
        return createResponsesCall(
          request,
          { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" },
          modelMessages,
          ASSISTANT_INSTRUCTIONS,
        ).response();
      },
    },
  },
});
