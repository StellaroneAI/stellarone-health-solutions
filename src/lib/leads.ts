/**
 * Backend-ready lead abstraction.
 *
 * Today submissions are handled by the local adapter below. To connect Supabase,
 * a CRM or an email service later, implement a new `LeadSink` and set it as the
 * active sink in `submitLead` — no form code changes required. Never place API
 * keys or secrets in this file; those belong on the server.
 */

export type Lead = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  jobTitle: string;
  organizationType: string;
  serviceInterest: string;
  monthlyClaimVolume: string;
  currentRCM: string;
  currentPMS: string;
  challenge: string;
  message: string;
  source: string;
  createdAt: string;
};

export type LeadInput = Omit<Lead, "source" | "createdAt">;

export type LeadResult = { ok: true } | { ok: false; error: string };

export interface LeadSink {
  name: string;
  send(lead: Lead): Promise<void>;
}

/** Default adapter: records the inquiry client-side until a backend is connected. */
const localSink: LeadSink = {
  name: "local",
  async send(lead) {
    if (typeof window !== "undefined") {
      const key = "stellarone_leads";
      const existing = JSON.parse(window.localStorage.getItem(key) ?? "[]") as Lead[];
      existing.push(lead);
      window.localStorage.setItem(key, JSON.stringify(existing.slice(-50)));
    }
    await new Promise((resolve) => setTimeout(resolve, 700));
  },
};

let activeSink: LeadSink = localSink;

export function setLeadSink(sink: LeadSink) {
  activeSink = sink;
}

export function buildLead(input: LeadInput, source = "website-contact-form"): Lead {
  return { ...input, source, createdAt: new Date().toISOString() };
}

export async function submitLead(input: LeadInput, source?: string): Promise<LeadResult> {
  try {
    await activeSink.send(buildLead(input, source));
    return { ok: true };
  } catch {
    // Raw backend errors are never surfaced to the visitor.
    return {
      ok: false,
      error: "We couldn't send your inquiry right now. Please try again or email us directly.",
    };
  }
}
