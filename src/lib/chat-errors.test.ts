import { test } from "node:test";
import assert from "node:assert/strict";
import { chatErrorMessage } from "./chat-errors";

test("configuration errors reach the visitor without being replaced", () => {
  assert.equal(chatErrorMessage('{"error":"Assistant is not configured on this deployment."}'), "Assistant is not configured on this deployment.");
});
test("safe provider error messages are preserved", () => {
  assert.equal(chatErrorMessage({ error: { message: "AI is disabled for this workspace." } }), "AI is disabled for this workspace.");
});