export interface GatewayFailure {
  status: number;
  message: string;
}

/** Extract only the upstream's safe message, never credentials or request diagnostics. */
export function gatewayFailure(status: number, body: unknown): GatewayFailure {
  const record = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const nested = record["error"] && typeof record["error"] === "object" ? record["error"] as Record<string, unknown> : {};
  const message = typeof record["message"] === "string" ? record["message"] : typeof nested["message"] === "string" ? nested["message"] : typeof record["error"] === "string" ? record["error"] : `Assistant service returned an error (${status}).`;
  return { status, message: message.slice(0, 1000) };
}

export function isAccessPause(status: number) { return status === 402 || status === 403; }

export function streamedGatewayFailure(event: unknown): GatewayFailure | null {
  if (!event || typeof event !== "object") return null;
  const record = event as Record<string, unknown>;
  const response = record["response"] && typeof record["response"] === "object" ? record["response"] as Record<string, unknown> : {};
  const error = record["error"] ?? response["error"];
  if (record["type"] !== "error" && record["type"] !== "response.failed") return null;
  const details = error && typeof error === "object" ? error as Record<string, unknown> : record;
  const code = details["type"] ?? details["code"];
  const explicitStatus = details["status"] ?? details["status_code"];
  const status = typeof explicitStatus === "number" ? explicitStatus : code === "permission_error" || code === "access_denied" ? 403 : 502;
  return gatewayFailure(status, { error: details });
}