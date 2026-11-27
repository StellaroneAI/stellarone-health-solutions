<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- Design tokens (navy/teal healthcare palette, Inter + Manrope) live only in `src/styles.css`; components use semantic token classes so theming stays in one place.
- Shared page building blocks live in `src/components/site/` (primitives, header, footer, hero, CTA band, feature grid, workflow diagram) — reuse them instead of bespoke section markup.
- Static marketing copy/data lives in `src/content/site.ts` so claims and service lists are edited in one place.
- Every route sets SEO metadata through `pageHead()` in `src/lib/seo.ts` (title, description, canonical, OG/Twitter).
- Lead capture goes through the `LeadSink` abstraction in `src/lib/leads.ts`; the active sink stores enquiries in Lovable Cloud via server functions in `src/lib/enquiries.functions.ts` (tables are service-role only), never secrets in frontend code.
- The enquiry chat assistant streams from `src/routes/api/chat.ts`; its knowledge prompt is built from `src/content/site.ts` so it never drifts from site claims.
- Primary site navigation groups RCM, Healthcare Automation and Agentic AI under Solutions; EasyMed remains a separate product, with About and Insights as distinct content routes.
- RCM scenarios use pure calculation logic with explicit visitor-supplied financial assumptions; specialty does not imply reimbursement defaults, so estimates remain transparent.
- Insight articles live in a static content collection and render under an Insights layout with leaf metadata and source links, so listings and article content stay consistent.
- Scheduling and system-experience sections read owner-confirmed configuration; absent configuration renders no compatibility claims and an honest email call-request fallback.
- AI gateway failures preserve safe reasons, disable automatic retries and persist access pauses in a service-only table; owner recovery is required before fresh requests resume.
