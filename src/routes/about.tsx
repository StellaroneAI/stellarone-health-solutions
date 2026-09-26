import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { Card, Section, SectionHeading } from "@/components/site/primitives";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead({ title: "About StellarOne Health", description: "Learn about StellarOne Health Technologies Pvt. Ltd., our mission, vision and healthcare operations and technology leadership.", path: "/about" }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About StellarOne" title="Healthcare expertise, operational delivery and technology in one company" description="StellarOne Health Technologies Pvt. Ltd. works with US healthcare organizations across revenue cycle operations, workflow automation, Agentic AI concepts and digital healthcare." primaryCta={{ label: "Talk to StellarOne", to: "/contact" }} secondaryCta={{ label: "Why StellarOne", to: "/why-stellarone" }} />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card><p className="text-xs font-semibold uppercase tracking-wide text-teal">Mission</p><h2 className="mt-3 text-2xl font-bold text-navy">Make healthcare operations more capable and connected</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Bring together knowledgeable people, disciplined revenue cycle execution and thoughtfully applied technology to support healthcare organizations.</p></Card>
          <Card><p className="text-xs font-semibold uppercase tracking-wide text-teal">Vision</p><h2 className="mt-3 text-2xl font-bold text-navy">Better healthcare operations through practical intelligence</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Build a future where operational expertise, automation and responsible AI work together to reduce complexity and improve how teams manage healthcare workflows.</p></Card>
        </div>
      </Section>
      <Section tone="surface"><SectionHeading eyebrow="How we think" title="People + healthcare expertise + technology + automation + AI" /><FeatureGrid className="mt-10" columns={4} features={[{title:"Healthcare context",description:"Start with the realities of payer, provider and patient workflows."},{title:"Operational discipline",description:"Define ownership, cadence, documentation and escalation paths."},{title:"Technology judgment",description:"Choose tools based on the workflow—not the trend."},{title:"Responsible innovation",description:"Keep people, controls and transparent review at decision points."}]} /></Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><SectionHeading eyebrow="Leadership" title="Founder-led and directly accountable" description="Leadership stays close to how opportunities are scoped, how work is designed and how customer conversations progress." /><Card><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-navy text-lg font-bold text-on-navy" aria-hidden="true">PJ</div><div><h2 className="text-xl font-semibold text-navy">Praveen Jayaraman</h2><p className="text-sm font-medium text-teal">Founder &amp; Chief Executive Officer</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Praveen leads StellarOne Health’s work across healthcare operations, automation and digital health technology.</p><a href="mailto:Praveen.Jayaraman@stellaronehealth.com" className="mt-3 inline-flex items-center gap-2 break-all text-sm font-medium text-navy underline-offset-4 hover:underline"><Mail className="h-4 w-4 text-teal" aria-hidden="true" />Praveen.Jayaraman@stellaronehealth.com</a></div></div></Card></div>
      </Section>
      <CtaBand title="Start a focused conversation" description="Tell us which healthcare operation, revenue cycle challenge or technology opportunity you are evaluating." primaryLabel="Talk to StellarOne" secondaryLabel="Request an RCM Assessment" />
    </>
  );
}