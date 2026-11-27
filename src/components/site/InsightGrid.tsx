import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INSIGHT_ARTICLES } from "@/content/insights";
import { Card } from "./primitives";

export function InsightGrid() {
  return <div className="mt-8 grid gap-5 md:grid-cols-3">{INSIGHT_ARTICLES.map((article) => <Card key={article.slug} className="flex min-w-0 flex-col overflow-hidden p-0"><img src={article.image} alt={article.imageAlt} loading="lazy" width={768} height={512} className="aspect-[3/2] w-full object-cover" /><div className="flex flex-1 flex-col p-6"><p className="text-xs font-semibold uppercase tracking-wide text-teal">{article.category}</p><h2 className="mt-3 text-xl font-semibold text-navy">{article.title}</h2><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{article.description}</p><Button asChild variant="link" className="mt-5 h-auto justify-start whitespace-normal p-0"><Link to="/insights/$slug" params={{ slug: article.slug }}>Read article <ArrowRight aria-hidden="true" /></Link></Button></div></Card>)}</div>;
}