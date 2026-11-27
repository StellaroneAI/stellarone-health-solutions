import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/primitives";
import { InsightGrid } from "@/components/site/InsightGrid";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/insights/")({
  head: () => pageHead({ title: "Healthcare Operations Insights", description: "Practical articles from StellarOne Health on prior authorization backlogs, denial follow-up and human oversight in healthcare AI, with references to CMS and NIST guidance.", path: "/insights" }),
  component: InsightsPage,
});

function InsightsPage() {
  return <><PageHero eyebrow="Insights" title="Practical thinking for healthcare operations leaders" description="Focused perspectives on revenue cycle delivery, authorization workflows and responsible healthcare AI." primaryCta={{ label: "Talk to StellarOne", to: "/contact" }} /><Section><SectionHeading eyebrow="From the operations desk" title="Decisions grounded in real workflows" description="Practical checklists and authoritative references for your next operational review." /><InsightGrid /></Section></>;
}