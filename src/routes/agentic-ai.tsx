import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { WorkflowDiagram } from "@/components/site/WorkflowDiagram";
import { Section, SectionHeading, Card, Disclaimer } from "@/components/site/primitives";
import { AGENT_CONCEPTS, GOVERNANCE } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/agentic-ai")({
  head: () =>
    pageHead({
      title: "Agentic AI for Healthcare Operations",
      description:
        "Agentic AI designed around healthcare operational workflows: AR, claims, denial, eligibility, reporting and operations agents with human-in-the-loop review, auditability and controlled automation.",
      path: "/agentic-ai",
    }),
  component: AgenticPage,
});

const FLOW = [
  { label: "Healthcare Data", detail: "Structured operational data drawn from approved source systems." },
  { label: "AI Orchestration", detail: "Work is routed to the agent scoped for that workflow." },
  { label: "Specialized Agent", detail: "The agent gathers context and prepares the next action." },
  { label: "Workflow Tool", detail: "Prepared actions are staged in the operational tool." },
  { label: "Human Review", detail: "An operator approves, edits or rejects before execution." },
  { label: "Audit / Reporting", detail: "Every step is logged and available for review." },
];

function AgenticPage() {
  return (
    <>
      <PageHero
        eyebrow="Agentic AI"
        title="AI agents that don't just generate answers — they help execute healthcare workflows"
        description="Agentic AI applies to the operational middle of healthcare: work queues, follow-ups, status checks and exception handling. StellarOne designs these workflows with human review and audit trails at the centre."
        primaryCta={{ label: "Discuss AI Automation", to: "/contact" }}
        secondaryCta={{ label: "Talk to StellarOne", to: "/contact" }}
        aside={
          <Card tone="navy">
            <h2 className="text-lg font-semibold text-on-navy">Traditional automation vs. agentic AI</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-on-navy">Traditional automation</dt>
                <dd className="mt-1 text-on-navy-muted">
                  Follows fixed rules on a fixed path. Predictable, but brittle when a payer,
                  format or exception changes.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-on-navy">Agentic AI</dt>
                <dd className="mt-1 text-on-navy-muted">
                  Works toward a defined goal within a bounded workflow, interprets context, and
                  prepares the next step for a person to approve.
                </dd>
              </div>
            </dl>
          </Card>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Conceptual demonstration"
          title="How an agentic workflow is designed"
          description="Each stage is deliberate. Nothing reaches a payer or a patient record without a human decision."
        />
        <WorkflowDiagram
          className="mt-10"
          steps={FLOW}
          caption="Conceptual demonstration of StellarOne's agentic workflow design."
        />
      </Section>

      <Section tone="navy">
        <SectionHeading
          onNavy
          eyebrow="Conceptual demonstration"
          title="Agent concepts for healthcare operations"
          description="Illustrative agent roles mapped to familiar revenue cycle workflows."
        />
        <FeatureGrid className="mt-10" tone="navy" features={AGENT_CONCEPTS} />
        <p className="mt-6 text-xs text-on-navy-muted">
          Conceptual demonstration. These agent roles describe designed workflows and are not a
          claim of production deployments.
        </p>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Governance"
          title="Controlled automation, by design"
          description="Healthcare operations need boundaries. These principles shape every workflow we design."
        />
        <FeatureGrid className="mt-10" columns={4} features={GOVERNANCE} />
      </Section>

      <Section>
        <div className="max-w-3xl">
          <Disclaimer>
            Conceptual demonstration: the agent roles and workflows described on this page represent
            StellarOne's design approach to healthcare operational automation. They are not a
            statement of currently deployed production AI agents, and no performance outcomes are
            claimed.
          </Disclaimer>
        </div>
      </Section>

      <CtaBand
        title="Explore where automation fits in your operations"
        description="We'll walk through your current workflows and identify where controlled automation is realistic — and where it isn't."
        primaryLabel="Discuss AI Automation"
        secondaryLabel="Talk to StellarOne"
      />
    </>
  );
}
