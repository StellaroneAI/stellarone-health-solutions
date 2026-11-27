import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Disclaimer } from "@/components/site/primitives";
import { INSIGHT_ARTICLES } from "@/content/insights";
import { MEDICAL_DISCLAIMER } from "@/content/site";
import { pageHead, SITE_URL, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = INSIGHT_ARTICLES.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData: article }) => {
    if (!article) return pageHead({ title: "Insight Not Found", description: "This StellarOne Health insight could not be found.", path: "/insights" });
    const head = pageHead({ title: article.title, description: article.description, path: `/insights/${article.slug}` });
    return { ...head, meta: head.meta.map((meta) => meta.property === "og:type" ? { ...meta, content: "article" } : meta), scripts: [...head.scripts, { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, mainEntityOfPage: `${SITE_URL}/insights/${article.slug}`, author: { "@type": "Organization", name: SITE_NAME }, publisher: { "@type": "Organization", name: SITE_NAME }, citation: article.sources.map((source) => source.url) }) }] };
  },
  component: InsightArticlePage,
});

function InsightArticlePage() {
  const article = Route.useLoaderData();
  return <article>
    <Section tone="surface"><div className="mx-auto max-w-3xl"><Button asChild variant="link" className="h-auto p-0"><Link to="/insights"><ArrowLeft aria-hidden="true" /> All insights</Link></Button><p className="mt-8 text-xs font-semibold uppercase tracking-wide text-teal">{article.category}</p><h1 className="mt-4 text-3xl font-bold leading-tight text-navy sm:text-4xl">{article.title}</h1><p className="mt-5 text-lg leading-relaxed text-muted-foreground">{article.description}</p><p className="mt-5 text-sm text-muted-foreground">StellarOne Health · Operations perspective</p><img src={article.image} alt={article.imageAlt} width={768} height={512} className="mt-8 aspect-[3/2] w-full rounded-lg object-cover" /></div></Section>
    <Section><div className="mx-auto max-w-3xl space-y-10">{article.ai ? <Disclaimer>Conceptual demonstration. These workflow examples do not describe confirmed production AI deployments. {MEDICAL_DISCLAIMER}</Disclaimer> : null}{article.sections.map((section) => <section key={section.title}><h2 className="text-2xl font-semibold text-navy">{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-base leading-8 text-muted-foreground">{paragraph}</p>)}{section.checklist ? <ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-relaxed text-muted-foreground">{section.checklist.map((item) => <li key={item}>{item}</li>)}</ul> : null}</section>)}<section className="border-t border-border pt-8"><h2 className="text-xl font-semibold text-navy">Sources &amp; further reading</h2><ul className="mt-4 space-y-3">{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-teal underline underline-offset-4">{source.label}</a></li>)}</ul><p className="mt-5 text-xs leading-relaxed text-muted-foreground">Operational perspective, not medical, legal or reimbursement advice. Verify current requirements with the relevant payer and your organization's qualified reviewers.</p></section><section className="border-t border-border pt-8"><h2 className="text-2xl font-semibold text-navy">Bring your workflow to the conversation</h2><p className="mt-3 text-muted-foreground">Discuss scope, systems and review responsibilities with our healthcare team.</p><Button asChild variant="brand" className="mt-5"><Link to="/contact">Talk to StellarOne <ArrowRight aria-hidden="true" /></Link></Button></section></div></Section>
  </article>;
}