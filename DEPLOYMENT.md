# Chat deployment and recovery

## Lovable-hosted site

`LOVABLE_API_KEY` is configured in this project. It is server-only and must never
be committed, added to a `VITE_*` variable, or returned by a diagnostic endpoint.
Publish the current app snapshot for server-route changes to reach the published site.

## External Vercel deployment

GitHub sync transfers source code, not Lovable's managed secrets. A missing
`LOVABLE_API_KEY` in an external deployment cannot be repaired by changing browser
code, copying `.env`, or rotating the working Lovable project key. This agent has
no access to this site's Vercel project settings or deployment credentials.

Use the Lovable-hosted deployment for the configured chat service. If retaining
Vercel, the deployment owner must establish supported server-secret provisioning
and verify the complete backend integration before redeploying. Do not copy
unavailable service-role credentials or send chat requests with a browser key.

The contact/chat enquiry persistence and email delivery also depend on managed
server configuration; verifying the AI key alone does not verify the external site.

## AI access pauses

`public.ai_access_state` is a service-role-only operational circuit breaker.
HTTP 402 and 403 pauses survive browser reloads and process restarts. Never clear
a provider denial or retry a refusal automatically. After the owner restores
access, a trusted backend operation may clear the `enquiry-chat` record; the next
call must come from a new visitor action. There is no public reset endpoint.

HTTP errors preserve the gateway status and its safe message. SDK retries are
disabled; no alternate endpoint, model, provider, or credential is attempted.

## Scheduling and compatibility

The public discovery-call link and verified system names are configured in the
shared site content collection. Until confirmed, the Contact page offers a real
email call-request link and the site publishes no software-compatibility claims.

## RCM assessment

Denied claims = monthly claims × denial rate / 100 (display rounded to a claim).
The optional financial scenario = monthly claims × denial rate / 100 × visitor's
average allowed claim value × visitor's assumed recoverable share / 100.
No default claim value, recovery percentage, specialty multiplier, guarantee,
or recovery timeframe is inferred. Contact receives the scenario as editable
enquiry context only after the visitor chooses to share it.