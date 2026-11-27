import { z } from "zod";
import type { UIMessage } from "ai";

const messageSchema = z.object({
  id: z.string().max(200),
  role: z.enum(["user", "assistant"]),
  parts: z.array(z.discriminatedUnion("type", [
    z.object({ type: z.literal("text"), text: z.string().max(2000) }).passthrough(),
    // Preserve SDK reasoning and its signed metadata during stateless replay.
    z.object({ type: z.literal("reasoning"), text: z.string().max(16000) }).passthrough(),
    z.object({ type: z.literal("step-start") }),
  ])).min(1).max(10),
}).passthrough();

export function parseChatMessages(input: unknown): UIMessage[] {
  const { messages } = z.object({
    messages: z.array(z.custom<UIMessage>((value) => messageSchema.safeParse(value).success)).min(1).max(30),
  }).parse(input);
  return messages;
}