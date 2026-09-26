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
- Lead capture goes through the `LeadSink` abstraction in `src/lib/leads.ts`; swap the sink to connect a backend, never put secrets in frontend code.
