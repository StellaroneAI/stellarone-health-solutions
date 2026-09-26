import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { WorkflowDiagram } from "@/components/site/WorkflowDiagram";
import { Section, SectionHeading, Card } from "@/components/site/primitives";
import { RCM_SERVICES } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/rcm")({
  head: () =>
    pageHead({
      title: "Healthcare Revenue Cycle Management",
      description:
        "Operational RCM support for US healthcare organizations: medical billing, claims, AR, denials, eligibility, posting, follow-up, coding support and reporting — modular or end-to-end.",
      path: "/rcm",
    }),
  component: RcmPage,
});

const CYCLE = [
  { label: "Patient Access", detail: "Eligibility, benefits and authorization requirements verified up front." },
  { label: "Charge Capture", detail: "Charge entry and claim creation aligned to payer and specialty rules." },
  { label: "Claim Submission", detail: "Scrubbing support, submission and clearinghouse rejection handling." },
  { label: "Payer Follow-Up", detail: "Status checks and structured follow-up on open claims." },
  { label: "Posting & Denials", detail: "ERA and manual posting, denial categorization and appeals support." },
  { label: "Reporting", detail: "AR, denial trend and productivity reporting on your cadence." },
];

function RcmPage() {
  return (
    <>
      <PageHero
        eyebrow="Revenue Cycle Management"
        title="An operational RCM partner for US healthcare organizations"
        description="StellarOne works as an extension of your revenue cycle team — not as software you have to run yourself. Our operations staff work your queues inside your systems, to your workflows."
        primaryCta={{ label: "Discuss Your RCM Needs", to: "/contact" }}
        secondaryCta={{ label: "Talk to Our Healthcare Team", to: "/contact" }}
        aside={
          <Card tone="navy">
            <h2 className="text-lg font-semibold text-on-navy">Two ways to engage</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-on-navy">Modular RCM services</dt>
                <dd className="mt-1 text-on-navy-muted">
                  Pick specific functions — AR follow-up, denials, eligibility, posting — and keep the
                  rest in-house.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-on-navy">End-to-end RCM support</dt>
                <dd className="mt-1 text-on-navy-muted">
                  Broader coverage across the cycle, from patient access through to reporting and AR
                  cleanup.
                </dd>
              </div>
            </dl>
          </Card>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Operational model"
          title="We run the work, not just the workflow diagram"
          description="Software alone doesn't clear an AR backlog. Our engagement model puts trained healthcare operations staff behind each queue, with documented outcomes and escalation paths."
        />
        <FeatureGrid
          className="mt-10"
          columns={3}
          features={[
            { title: "Inside your systems", description: "We work in your existing PMS, EHR, clearinghouse and payer portals." },
            { title: "Your workflows", description: "Cadence, priorities and escalation rules are defined with your team." },
            { title: "Documented outcomes", description: "Each touch is documented so the next action is always clear." },
          ]}
        />
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Coverage" title="Where we support the revenue cycle" />
        <WorkflowDiagram className="mt-10" steps={CYCLE} caption="Representative end-to-end coverage. Scope is defined per engagement." />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Services"
          title="Revenue cycle services"
          description="Engage any single service or combine them into broader support."
        />
        <FeatureGrid className="mt-10" features={RCM_SERVICES.slice(0, 6)} />
        <div className="mt-8">
          <Button asChild variant="brand" size="lg">
            <Link to="/rcm-services">View all RCM services</Link>
          </Button>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
