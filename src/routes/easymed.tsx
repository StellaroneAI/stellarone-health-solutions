import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { DeviceMock } from "@/components/site/DeviceMock";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { WorkflowDiagram } from "@/components/site/WorkflowDiagram";
import { Section, SectionHeading, Disclaimer } from "@/components/site/primitives";
import { EASYMED_FEATURES, MEDICAL_DISCLAIMER } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/easymed")({
  head: () =>
    pageHead({
      title: "EasyMed — Digital Healthcare & Telehealth Platform",
      description:
        "EasyMed is StellarOne Health's digital healthcare and telehealth platform: telehealth, AI-assisted interaction, multilingual and voice-enabled experiences, patient engagement and mobile-first healthcare workflows.",
      path: "/easymed",
    }),
  component: EasyMedPage,
});

const JOURNEY = [
  { label: "Access", detail: "Patients reach care from a mobile-first interface." },
  { label: "Intake", detail: "Digital intake captures structured information ahead of the visit." },
  { label: "Consultation", detail: "Telehealth session with the care team." },
  { label: "Follow-up", detail: "Reminders and structured follow-up communication." },
];

function EasyMedPage() {
  return (
    <>
      <PageHero
        eyebrow="EasyMed"
        title="StellarOne Health's digital healthcare and telehealth platform"
        description="EasyMed brings telehealth, patient engagement and AI-assisted interaction into one mobile-first experience, designed for multilingual and voice-enabled access."
        primaryCta={{ label: "Explore EasyMed", to: "/contact" }}
        secondaryCta={{ label: "Talk to Our Team", to: "/contact" }}
        aside={<DeviceMock />}
      />

      <Section>
        <SectionHeading
          eyebrow="Capabilities"
          title="Built around how people actually reach care"
          description="Digital healthcare workflows for patients and care teams, from first access through follow-up."
        />
        <FeatureGrid className="mt-10" features={EASYMED_FEATURES} />
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Experience" title="A simple patient journey" />
        <WorkflowDiagram className="mt-10" steps={JOURNEY} />
      </Section>

      <Section tone="navy">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              onNavy
              eyebrow="For healthcare organizations"
              title="Digital healthcare alongside your operations"
              description="EasyMed sits naturally beside StellarOne's revenue cycle and workflow automation work, so digital access and back-office operations are considered together."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="onNavy" size="xl" className="w-full sm:w-auto">
                <Link to="/contact">Explore EasyMed</Link>
              </Button>
              <Button asChild variant="outlineOnNavy" size="xl" className="w-full sm:w-auto">
                <Link to="/contact">Talk to Our Team</Link>
              </Button>
            </div>
          </div>
          <FeatureGrid
            tone="navy"
            columns={2}
            features={[
              { title: "Mobile-first", description: "Designed for small screens and low-friction access." },
              { title: "Multilingual", description: "Interaction designed to work across languages." },
              { title: "Voice-enabled", description: "Voice navigation for users who prefer speaking." },
              { title: "AI-assisted", description: "Assistive guidance supporting healthcare interactions." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <Disclaimer>{MEDICAL_DISCLAIMER}</Disclaimer>
        </div>
      </Section>

      <CtaBand
        title="See where EasyMed fits for your organization"
        primaryLabel="Explore EasyMed"
        secondaryLabel="Talk to Our Team"
      />
    </>
  );
}
