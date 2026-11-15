import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/** Emails the owner a copy; failures never block saving the enquiry. */
async function notifyOwner(idempotencyKey: string, templateData: Record<string, unknown>) {
  try {
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    await sendTemplateEmail("owner-enquiry", "Praveen.Jayaraman@stellaronehealth.com", { templateData, idempotencyKey });
  } catch (err) {
    console.error("owner notification failed", err);
  }
}

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
  .validator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin.from("contact_submissions").insert({
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
    }).select("id").single();
    if (error) {
      console.error("contact insert failed", error);
      throw new Error("Could not save enquiry");
    }
    await notifyOwner(`owner-contact-${row.id}`, {
      kind: data.source === "website-automation-opportunity" ? "automation enquiry" : "RCM assessment request",
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      company: data.company,
      fields: [
        { label: "Phone", value: data.phone },
        { label: "Job title", value: data.jobTitle },
        { label: "Organization type", value: data.organizationType },
        { label: "Service", value: data.serviceInterest },
        { label: "Monthly claim volume", value: data.monthlyClaimVolume },
        { label: "Current RCM setup", value: data.currentRCM },
        { label: "Current system", value: data.currentPMS },
        { label: "Challenge", value: data.challenge },
        { label: "Message", value: data.message },
      ],
    });
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
  .validator((input: unknown) => chatSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin.from("chat_enquiries").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      organization_type: data.organizationType || null,
      need: data.need || null,
      transcript: data.transcript,
    }).select("id").single();
    if (error) {
      console.error("chat enquiry insert failed", error);
      throw new Error("Could not save enquiry");
    }
    await notifyOwner(`owner-chat-${row.id}`, {
      kind: "chat enquiry",
      name: data.name,
      email: data.email,
      company: data.company,
      fields: [
        { label: "Organization type", value: data.organizationType },
        { label: "Need", value: data.need },
      ],
      transcript: data.transcript,
    });
    return { ok: true as const };
  });
