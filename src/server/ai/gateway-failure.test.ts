import { test } from "node:test";
import assert from "node:assert/strict";
import { gatewayFailure, isAccessPause, streamedGatewayFailure } from "./gateway-failure";

test("upstream denial status and safe reason are preserved", () => {
  assert.deepEqual(gatewayFailure(403, { error: { message: "Provider access denied." } }), { status: 403, message: "Provider access denied." });
});
test("credit and permission failures pause access but transient failures do not", () => {
  assert.equal(isAccessPause(402), true);
  assert.equal(isAccessPause(403), true);
  assert.equal(isAccessPause(429), false);
  assert.equal(isAccessPause(500), false);
});
test("a permission failure after streaming starts remains a terminal denial", () => {
  assert.deepEqual(streamedGatewayFailure({ type: "response.failed", response: { error: { code: "permission_error", message: "Access denied." } } }), { status: 403, message: "Access denied." });
});