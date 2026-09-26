import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { WorkflowDiagram } from "@/components/site/WorkflowDiagram";
import { Section, SectionHeading, Card, Disclaimer } from "@/components/site/primitives";
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
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Leadership"
              title="Led by an operator, not a brochure"
              description="StellarOne Health is led directly by its founder, who stays involved in how engagements are scoped and delivered."
            />
          </div>
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div
                className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-navy text-lg font-bold text-on-navy"
                aria-hidden="true"
              >
                PJ
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-navy">Praveen Jayaraman</h3>
                <p className="text-sm font-medium text-teal">
                  Founder &amp; Chief Executive Officer
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Praveen leads StellarOne Health's work with US healthcare organizations across
                  revenue cycle operations, healthcare workflow automation and digital health
                  technology.
                </p>
                <a
                  href="mailto:Praveen.Jayaraman@stellaronehealth.com"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-navy underline-offset-4 hover:underline"
                >
                  <Mail className="h-4 w-4 text-teal" aria-hidden="true" />
                  Praveen.Jayaraman@stellaronehealth.com
                </a>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section tone="surface">
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
