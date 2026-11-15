# AI enquiry assistant + inbox routing

## What you'll get
1. **Enquiry chat assistant** – floating "Talk to StellarOne" button, bottom-right, on every page (navy/teal, full-screen on phones).
   - Answers questions about RCM services, healthcare automation, Agentic AI (labelled conceptual) and EasyMed, using only the site's own content.
   - Never gives medical advice, never invents clients/stats/certifications, and reminds visitors not to share patient information.
   - Gently collects name, work email, company, organization type and need, then offers "Send to our team".
2. **Every enquiry is saved** – contact-form submissions and chat enquiries (with summary and transcript) are stored securely, so nothing is lost even if email fails.
3. **Copy emailed to Praveen.Jayaraman@stellaronehealth.com** – one email per contact-form submission and per finished chat enquiry, with contact details, summary and transcript.

## One thing needed from you
Emails can only be sent from a domain you own (e.g. notify@stellaronehealth.com). You'll be asked to set up **stellaronehealth.com** as the sender — a short DNS step at your domain provider. Until that is verified, enquiries are still saved and visible in the backend; emails start automatically once verified.

## Extra recommendations
- **Visitor confirmation email** ("Thanks, we received your enquiry") – optional, say if you want it.
- **Spam protection** – hidden honeypot field plus basic rate limits on the form and chat.
- **Chat limits** – cap message length and conversation length to control AI cost.
- **Privacy page update** – mention the AI assistant and how enquiries are stored.
- **Simple enquiries view** later – a private signed-in page listing all enquiries (not in this step).

## Technical details
- Enable Lovable Cloud; tables `contact_submissions` and `chat_enquiries` (RLS on, server-side inserts only).
- New `LeadSink` that calls a server function; validation with zod.
- Chat: server route streaming via Lovable AI Gateway (default model), AI Elements chat UI, system prompt built from `src/content/site.ts`; single conversation, not persisted until the visitor submits.
- Lovable app emails: scaffold templates, `owner-enquiry` template with fixed recipient, idempotency key from row id.
- Verify: test submission + chat enquiry, confirm rows and email logs, delete test rows.
