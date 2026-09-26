import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading, Card } from "@/components/site/primitives";
import { RCM_SERVICES } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/rcm-services")({
  head: () =>
    pageHead({
      title: "RCM Services",
      description:
        "Medical billing, claims management, AR management, denial management, eligibility and benefits, payment posting, insurance follow-up, coding support, reporting and AR cleanup for US healthcare organizations.",
      path: "/rcm-services",
    }),
  component: RcmServicesPage,
});

function RcmServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="RCM Services"
        title="Ten revenue cycle services, delivered modularly or together"
        description="Choose the functions you need today. Each service is scoped with defined volumes, cadence and reporting, and can expand into broader end-to-end support."
        primaryCta={{ label: "Discuss Your RCM Needs", to: "/contact" }}
        secondaryCta={{ label: "Talk to Our Healthcare Team", to: "/contact" }}
      />

      <Section>
        <SectionHeading eyebrow="Service catalogue" title="What we can operate for you" />
        <FeatureGrid className="mt-10" features={RCM_SERVICES} />
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Engagement models" title="Modular or broader support" />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-navy">Modular RCM</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Add operational capacity to a specific function while your team keeps the rest. Common
              starting points are AR follow-up, denial management, eligibility verification and
              payment posting.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <li>Defined scope and volumes</li>
              <li>Agreed daily or weekly cadence</li>
              <li>Function-level reporting</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-navy">End-to-end RCM</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Broader coverage across patient access, billing, claims, AR, denials, posting and
              reporting, coordinated by a single operational team.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <li>Coordinated coverage across the cycle</li>
              <li>Root-cause feedback into upstream steps</li>
              <li>Consolidated revenue cycle reporting</li>
            </ul>
          </Card>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
