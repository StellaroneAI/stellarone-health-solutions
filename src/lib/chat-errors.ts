/** Only safe, explicit server messages are passed to the visitor. */
export function chatErrorMessage(value: unknown): string {
  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      return chatErrorMessage(parsed);
    } catch {
      return value.trim().slice(0, 1000) || "The assistant could not complete this request.";
    }
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record["message"] === "string") return record["message"].slice(0, 1000);
    if (typeof record["error"] === "string") return record["error"].slice(0, 1000);
    if (record["error"] && typeof record["error"] === "object") return chatErrorMessage(record["error"]);
  }
  return "The assistant could not complete this request. You can still send your enquiry to our team.";
}