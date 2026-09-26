import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Card, Section, SectionHeading } from "@/components/site/primitives";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/insights")({
  head: () => pageHead({ title: "Healthcare Operations Insights", description: "Practical perspectives from StellarOne Health on revenue cycle management, healthcare automation, Agentic AI and digital healthcare workflows.", path: "/insights" }),
  component: InsightsPage,
});

const TOPICS = [
  { eyebrow: "RCM Insights", title: "What to examine before adding an RCM operating partner", description: "A practical evaluation framework covering scope, systems, work queues, reporting and escalation expectations.", to: "/rcm" },
  { eyebrow: "Healthcare Automation", title: "Choosing the right workflow to automate first", description: "Why bounded, repetitive workflows with clear exception paths make stronger starting points.", to: "/healthcare-automation" },
  { eyebrow: "Healthcare AI", title: "Human oversight in agentic healthcare workflows", description: "Where review gates, approvals and audit trails fit into an AI-assisted operating model.", to: "/agentic-ai" },
  { eyebrow: "Digital Healthcare", title: "Designing access around patients and care teams", description: "How mobile-first, multilingual and voice-enabled experiences can support digital healthcare access.", to: "/easymed" },
] as const;

function InsightsPage() {
  return <><PageHero eyebrow="Insights" title="Practical thinking for healthcare operations and technology leaders" description="Focused perspectives on revenue cycle delivery, healthcare automation, responsible AI workflows and digital healthcare—without invented case studies or unsupported claims." primaryCta={{ label: "Talk to StellarOne", to: "/contact" }} />
    <Section><SectionHeading eyebrow="Explore by topic" title="Ideas grounded in operational reality" description="Start with the area most relevant to your organization." /><div className="mt-10 grid gap-5 md:grid-cols-2">{TOPICS.map((topic) => <Card key={topic.title} className="flex flex-col"><p className="text-xs font-semibold uppercase tracking-wide text-teal">{topic.eyebrow}</p><h2 className="mt-3 text-xl font-semibold text-navy">{topic.title}</h2><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{topic.description}</p><Button asChild variant="link" className="mt-4 h-auto justify-start p-0"><Link to={topic.to}>Explore this topic <ArrowRight aria-hidden="true" /></Link></Button></Card>)}</div></Section>
  </>;
}