import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading, Disclaimer } from "@/components/site/primitives";
import { INDUSTRIES } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/industries")({
  head: () =>
    pageHead({
      title: "Industries We Serve",
      description:
        "StellarOne Health supports medical groups, behavioral health organizations, billing companies, healthcare technology companies, clinics and healthcare operations teams across the US.",
      path: "/industries",
    }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Healthcare organizations we support"
        description="Our operational model fits organizations that need dependable revenue cycle execution and a practical path toward healthcare workflow automation."
        primaryCta={{ label: "Request an RCM Assessment", to: "/contact" }}
        secondaryCta={{ label: "Discuss an RCM Partnership", to: "/contact" }}
      />

      <Section>
        <SectionHeading eyebrow="Who we serve" title="Organizations across US healthcare" />
        <FeatureGrid className="mt-10" features={INDUSTRIES} />
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Fit"
          title="When an operational partner helps most"
          description="Common situations where organizations bring us in."
        />
        <FeatureGrid
          className="mt-10"
          columns={3}
          features={[
            { title: "Aged AR backlog", description: "Balances sitting beyond normal follow-up windows, including legacy systems." },
            { title: "Recurring denials", description: "Denial patterns that keep returning without a documented root cause." },
            { title: "Staffing gaps", description: "Open roles or turnover affecting daily billing and follow-up coverage." },
            { title: "Growth pressure", description: "New locations, providers or payers stretching existing capacity." },
            { title: "System transitions", description: "Migrations that leave balances and workflows split across systems." },
            { title: "Automation planning", description: "Teams evaluating where automation could realistically help." },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <Disclaimer>
            StellarOne does not publish client names, outcomes or performance statistics on this
            site. Specific references and scope details are discussed directly during evaluation.
          </Disclaimer>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
