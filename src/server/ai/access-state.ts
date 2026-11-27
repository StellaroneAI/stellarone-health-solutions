/** Durable circuit breaker. Clear only after access is restored, through trusted owner tools. */
export async function getAiAccessPause() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("ai_access_state").select("status,message").eq("id", "enquiry-chat").maybeSingle();
  if (error) throw new Error("Unable to check assistant availability.");
  return data;
}

export async function pauseAiAccess(status: number, message: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("ai_access_state").upsert({ id: "enquiry-chat", status, message, updated_at: new Date().toISOString() });
  if (error) throw new Error("Unable to save assistant access state.");
}