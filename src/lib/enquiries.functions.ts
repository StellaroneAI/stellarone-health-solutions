import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const s = (max: number) => z.string().trim().max(max);

const contactSchema = z.object({
  firstName: s(100).min(1),
  lastName: s(100).min(1),
  company: s(100).min(1),
  email: s(255).email(),
  phone: s(30),
  jobTitle: s(100),
  organizationType: s(100),
  serviceInterest: s(100),
  monthlyClaimVolume: s(50),
  currentRCM: s(50),
  currentPMS: s(100),
  challenge: s(500),
  message: s(1500),
  source: s(60),
  website: z.string().max(200).optional(), // honeypot
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      source: data.source,
      first_name: data.firstName,
      last_name: data.lastName,
      company: data.company,
      email: data.email,
      phone: data.phone || null,
      job_title: data.jobTitle || null,
      organization_type: data.organizationType || null,
      service_interest: data.serviceInterest || null,
      monthly_claim_volume: data.monthlyClaimVolume || null,
      current_rcm: data.currentRCM || null,
      current_pms: data.currentPMS || null,
      challenge: data.challenge || null,
      message: data.message || null,
    });
    if (error) {
      console.error("contact insert failed", error);
      throw new Error("Could not save enquiry");
    }
    return { ok: true as const };
  });

const chatSchema = z.object({
  name: s(100).min(1),
  email: s(255).email(),
  company: s(100),
  organizationType: s(100),
  need: s(500),
  transcript: z
    .array(z.object({ role: z.enum(["user", "assistant"]), text: s(4000) }))
    .max(40),
  website: z.string().max(200).optional(),
});

export const submitChatEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => chatSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("chat_enquiries").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      organization_type: data.organizationType || null,
      need: data.need || null,
      transcript: data.transcript,
    });
    if (error) {
      console.error("chat enquiry insert failed", error);
      throw new Error("Could not save enquiry");
    }
    return { ok: true as const };
  });
