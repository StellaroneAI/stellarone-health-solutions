import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { WorkflowDiagram } from "@/components/site/WorkflowDiagram";
import { Section, SectionHeading, Disclaimer } from "@/components/site/primitives";
import { GOVERNANCE, MEDICAL_DISCLAIMER } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/healthcare-ai")({
  head: () =>
    pageHead({
      title: "Healthcare AI Approach",
      description:
        "StellarOne Health's approach to healthcare AI: operational focus, human oversight, auditability, secure integrations and controlled automation across healthcare workflows.",
      path: "/healthcare-ai",
    }),
  component: HealthcareAiPage,
});

const PRINCIPLES = [
  {
    title: "Operations before novelty",
    description:
      "We apply AI where healthcare work is repetitive, high-volume and rule-bounded — not where judgement belongs to a clinician or an operator.",
  },
  {
    title: "Assistive, never autonomous at the edge",
    description:
      "Models prepare and summarize. People decide. Approval gates sit before any action leaves the system.",
  },
  {
    title: "Scoped data access",
    description:
      "Integrations are designed around least-privilege access to the specific data a workflow requires.",
  },
  {
    title: "Explainable steps",
    description:
      "Each stage produces a record of what was read, what was prepared and what a person decided.",
  },
  {
    title: "Measurable workflows",
    description:
      "Throughput, exceptions and rework are tracked so automation can be evaluated honestly.",
  },
  {
    title: "Reversible adoption",
    description:
      "Workflows are introduced in stages so a step can be paused or rolled back without disruption.",
  },
];

const ADOPTION = [
  { label: "Observe", detail: "Document the real workflow as operators perform it today." },
  { label: "Scope", detail: "Select a bounded step with clear inputs and a clear definition of done." },
  { label: "Assist", detail: "AI prepares the work; operators review every output." },
  { label: "Measure", detail: "Track exceptions, rework and time spent against the manual baseline." },
  { label: "Govern", detail: "Set access, logging, monitoring and approval rules before widening scope." },
  { label: "Extend", detail: "Expand only where the measured result supports it." },
];

function HealthcareAiPage() {
  return (
    <>
      <PageHero
        eyebrow="Healthcare AI"
        title="A measured approach to AI in healthcare operations"
        description="Healthcare AI only earns its place when it is governed, auditable and useful to the people doing the work. This is how StellarOne evaluates and introduces it."
        primaryCta={{ label: "Discuss AI Automation", to: "/contact" }}
        secondaryCta={{ label: "Talk to StellarOne", to: "/contact" }}
      />

      <Section>
        <SectionHeading eyebrow="Principles" title="How we think about healthcare AI" />
        <FeatureGrid className="mt-10" features={PRINCIPLES} />
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Adoption path"
          title="From manual workflow to governed automation"
          description="A staged path that keeps operations stable while capability is introduced."
        />
        <WorkflowDiagram className="mt-10" steps={ADOPTION} />
      </Section>

      <Section tone="navy">
        <SectionHeading onNavy eyebrow="Controls" title="The controls that make it workable" />
        <FeatureGrid className="mt-10" tone="navy" columns={4} features={GOVERNANCE} />
      </Section>

      <Section>
        <div className="max-w-3xl space-y-4">
          <Disclaimer>{MEDICAL_DISCLAIMER}</Disclaimer>
          <Disclaimer>
            Conceptual demonstration: descriptions on this page reflect StellarOne's design and
            evaluation approach to healthcare AI rather than claims about currently deployed
            production systems or measured outcomes.
          </Disclaimer>
        </div>
      </Section>

      <CtaBand
        title="Talk through an AI workflow with our team"
        primaryLabel="Discuss AI Automation"
        secondaryLabel="Talk to StellarOne"
      />
    </>
  );
}
