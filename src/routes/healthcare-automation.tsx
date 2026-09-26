import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { WorkflowDiagram } from "@/components/site/WorkflowDiagram";
import { Card, Disclaimer, Section, SectionHeading } from "@/components/site/primitives";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/healthcare-automation")({
  head: () =>
    pageHead({
      title: "Healthcare Workflow Automation",
      description:
        "Explore practical healthcare automation for eligibility, claims, denials, AR follow-up and reporting—with people retained at decision points.",
      path: "/healthcare-automation",
    }),
  component: HealthcareAutomationPage,
});

const OPPORTUNITIES = [
  { title: "Eligibility workflows", description: "Structure verification steps and surface exceptions for team review before service." },
  { title: "Claims status workflows", description: "Organize status checks, responses and next actions into consistent work queues." },
  { title: "Denial intake", description: "Categorize incoming denials and route them to the appropriate resolution path." },
  { title: "AR prioritization", description: "Help teams organize follow-up by aging, payer, balance and defined business rules." },
  { title: "Payment reconciliation", description: "Support structured comparison of posted payments, adjustments and exceptions." },
  { title: "Operational reporting", description: "Assemble recurring workflow information for review by operators and leaders." },
];

const METHOD = [
  { label: "Observe", detail: "Map the current workflow, systems, hand-offs and exception paths." },
  { label: "Prioritize", detail: "Identify repetitive, rules-based steps where automation may be useful." },
  { label: "Design", detail: "Define boundaries, review gates, access controls and escalation rules." },
  { label: "Validate", detail: "Test the workflow with operators before considering broader use." },
];

function HealthcareAutomationPage() {
  return (
    <>
      <PageHero
        eyebrow="Healthcare Automation"
        title="Reduce repetitive work without losing operational control"
        description="StellarOne designs automation around the healthcare workflows, systems and review points your team already uses. The objective is practical support—not automation for its own sake."
        primaryCta={{ label: "Discuss an Automation Opportunity", to: "/contact" }}
        secondaryCta={{ label: "Explore Healthcare AI", to: "/healthcare-ai" }}
        aside={
          <Card tone="navy">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-soft">A practical starting point</p>
            <h2 className="mt-3 text-xl font-semibold text-on-navy">Start with one bounded workflow</h2>
            <ul className="mt-5 space-y-3 text-sm text-on-navy-muted">
              {["Clear inputs and outputs", "Defined human review points", "Documented exception handling", "Measurable operational purpose"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        }
      />

      <Section>
        <SectionHeading eyebrow="Workflow opportunities" title="Where healthcare automation may support your team" description="The right opportunity depends on your systems, data, volume, exceptions and control requirements." />
        <FeatureGrid className="mt-10" columns={3} features={OPPORTUNITIES} />
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Our method" title="Designed around the work as it happens today" />
        <WorkflowDiagram className="mt-10" steps={METHOD} caption="Representative evaluation approach. Scope is defined with each organization." />
      </Section>

      <Section tone="navy">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <SectionHeading onNavy eyebrow="Automation and AI" title="Use the right level of intelligence for the workflow" description="Fixed automation can suit predictable steps. AI-assisted or agentic patterns may help where context and exceptions matter. Both require clear boundaries." />
          <Card tone="navy">
            <p className="text-sm leading-relaxed text-on-navy-muted">Explore how StellarOne distinguishes workflow automation from Agentic AI, and how human review remains part of the operating model.</p>
            <Button asChild variant="onNavy" size="lg" className="mt-5">
              <Link to="/agentic-ai">Explore Agentic AI <ArrowRight aria-hidden="true" /></Link>
            </Button>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl"><Disclaimer>Automation and AI examples on this page are conceptual and subject to workflow, integration, security and operational review. They do not represent guaranteed outcomes or confirmed production deployments.</Disclaimer></div>
      </Section>
      <CtaBand title="Explore a practical automation opportunity" description="Bring us one repetitive healthcare workflow. We’ll discuss the current process, exceptions and where controlled automation may fit." primaryLabel="Discuss an Automation Opportunity" secondaryLabel="Talk to StellarOne" />
    </>
  );
}