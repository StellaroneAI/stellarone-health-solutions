import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { WorkflowDiagram } from "@/components/site/WorkflowDiagram";
import { Section, SectionHeading, Disclaimer } from "@/components/site/primitives";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/why-stellarone")({
  head: () =>
    pageHead({
      title: "Why StellarOne Health",
      description:
        "StellarOne Health combines operational revenue cycle delivery with healthcare technology and controlled automation — an operating partner for US healthcare organizations.",
      path: "/why-stellarone",
    }),
  component: WhyPage,
});

const REASONS = [
  {
    title: "An operating partner, not only software",
    description:
      "Our team performs the daily revenue cycle work inside your systems, following your workflows and escalation rules.",
  },
  {
    title: "Modular by design",
    description:
      "Start with one function, prove the working relationship, then expand scope when it makes commercial sense.",
  },
  {
    title: "Transparency in how work is done",
    description:
      "Documented workflows, recorded touches and operational reporting so you can see what was worked and what is next.",
  },
  {
    title: "Technology understanding",
    description:
      "We build healthcare technology ourselves, so automation is assessed against real operational constraints.",
  },
  {
    title: "Root-cause orientation",
    description:
      "Denial and AR findings feed back into upstream processes instead of being worked in isolation.",
  },
  {
    title: "Practical automation path",
    description:
      "Automation candidates come from observed workflow patterns, with human review retained at decision points.",
  },
];

const ENGAGE = [
  { label: "Introductory call", detail: "Understand your organization, systems and current challenges." },
  { label: "Scoping", detail: "Define services, volumes, cadence and success measures." },
  { label: "Transition plan", detail: "Access, documentation and workflow definitions agreed in writing." },
  { label: "Steady-state operations", detail: "Daily execution with reporting and regular reviews." },
];

function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why StellarOne"
        title="Healthcare operations delivery, backed by healthcare technology"
        description="StellarOne Health Technologies Pvt. Ltd. supports US healthcare organizations as an operational partner across revenue cycle, workflow automation and digital health."
        primaryCta={{ label: "Talk to Our Healthcare Team", to: "/contact" }}
        secondaryCta={{ label: "Discuss Your RCM Needs", to: "/contact" }}
      />

      <Section>
        <SectionHeading eyebrow="Our approach" title="What working with us looks like" />
        <FeatureGrid className="mt-10" features={REASONS} />
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Engagement" title="How an engagement starts" />
        <WorkflowDiagram className="mt-10" steps={ENGAGE} />
      </Section>

      <Section>
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Straight talk" title="What we don't claim" />
          <div className="mt-6">
            <Disclaimer>
              We do not publish client names, logos, testimonials, case studies, awards,
              certifications, savings percentages or performance statistics on this website. Where
              AI capabilities are described, they are presented as conceptual demonstrations of
              designed workflows unless stated otherwise. Scope, references and specifics are
              discussed directly during evaluation.
            </Disclaimer>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
