import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { OpsConsole } from "@/components/site/OpsConsole";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { WorkflowDiagram } from "@/components/site/WorkflowDiagram";
import { Section, SectionHeading, Container } from "@/components/site/primitives";
import { INDUSTRIES, RCM_SERVICES, MEDICAL_DISCLAIMER } from "@/content/site";
import { pageHead } from "@/lib/seo";
import { Bot, HeartPulse, LineChart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Healthcare RCM, Agentic AI & Digital Health",
      description:
        "StellarOne Health is an operational partner for US healthcare organizations: revenue cycle management, agentic AI for healthcare workflows and the EasyMed digital health platform.",
      path: "/",
    }),
  component: Home,
});

const PILLARS = [
  {
    title: "Healthcare Revenue Cycle Management",
    icon: LineChart,
    description:
      "Modular or end-to-end RCM support delivered as an operational extension of your team.",
    points: ["Billing, AR and denials", "Eligibility and posting", "Reporting and AR cleanup"],
  },
  {
    title: "Agentic AI for Healthcare Operations",
    icon: Bot,
    description:
      "AI agents designed to help execute defined healthcare workflows with people in control.",
    points: ["Human-in-the-loop", "Auditable steps", "Controlled automation"],
  },
  {
    title: "EasyMed Healthcare Technology",
    icon: HeartPulse,
    description:
      "StellarOne Health's digital healthcare and telehealth platform for mobile-first access.",
    points: ["Telehealth", "Patient engagement", "Multilingual, voice-enabled"],
  },
];

const HOW_WE_WORK = [
  { label: "Discovery", detail: "We review your specialties, payers, systems and current pain points." },
  { label: "Scope", detail: "We define modular or end-to-end scope, work volumes and service levels." },
  { label: "Transition", detail: "Access, documentation and workflow definitions are set up with your team." },
  { label: "Operate", detail: "Daily queues are worked to agreed cadence with documented outcomes." },
  { label: "Report", detail: "Operational reporting on AR, denials and completed work." },
  { label: "Optimize", detail: "Root-cause findings feed workflow changes and automation candidates." },
];

const FAQS = [
  {
    q: "Can StellarOne work as an operational RCM partner, not just a software vendor?",
    a: "Yes. Our core offering is operational: our team works your billing, AR, denial and follow-up queues inside your systems, following your workflows and escalation rules.",
  },
  {
    q: "Do we have to outsource our entire revenue cycle?",
    a: "No. Engagements can be modular — for example AR follow-up or denial management only — or broader end-to-end support across the revenue cycle.",
  },
  {
    q: "Which systems do you work in?",
    a: "We work inside your existing practice management, EHR and clearinghouse tools. Tell us your current setup on the contact form and we'll confirm fit.",
  },
  {
    q: "What does Agentic AI mean in your context?",
    a: "AI agents that help execute steps in defined healthcare operational workflows — preparing work, gathering context and drafting next actions — with human review before anything is finalized.",
  },
  {
    q: "What is EasyMed?",
    a: "EasyMed is StellarOne Health's digital healthcare and telehealth platform, covering telehealth, patient engagement and digital healthcare workflows.",
  },
  {
    q: "How do we start a conversation?",
    a: "Share your organization type, services of interest and current setup through the contact form. Our healthcare team will follow up to scope a practical next step.",
  },
];

function Home() {
  return (
    <>
      <PageHero
        eyebrow="US Healthcare Operations & Technology"
        title={
          <>
            An operational partner for US healthcare revenue cycle and workflow automation
          </>
        }
        description="StellarOne Health supports US healthcare organizations with revenue cycle management delivered by our operations team, agentic AI designed for healthcare workflows, and EasyMed, our digital health platform."
        primaryCta={{ label: "Discuss Your RCM Needs", to: "/contact" }}
        secondaryCta={{ label: "Talk to Our Healthcare Team", to: "/contact" }}
        aside={<OpsConsole />}
      />

      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Three connected capabilities for healthcare organizations"
          description="Operations first, technology alongside it. Each capability can stand alone or work together."
        />
        <FeatureGrid className="mt-10" features={PILLARS} />
      </Section>

      <Section tone="surface" id="rcm">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Revenue Cycle Management"
              title="Modular or end-to-end RCM support"
              description="Take a single function or the full cycle. Our team works inside your systems, to your workflows, with documented outcomes."
            />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="brand" size="lg">
                <Link to="/rcm">Explore RCM</Link>
              </Button>
              <Button asChild variant="outlineBrand" size="lg">
                <Link to="/rcm-services">See all services</Link>
              </Button>
            </div>
          </div>
          <FeatureGrid
            columns={2}
            features={RCM_SERVICES.slice(0, 6).map((s) => ({
              title: s.title,
              description: s.description,
              image: s.image,
              imageAlt: s.imageAlt,
            }))}
          />
        </div>
      </Section>

      <Section tone="navy" id="agentic-ai">
        <SectionHeading
          onNavy
          eyebrow="Agentic AI"
          title="AI agents that help execute healthcare workflows"
          description="Not just answers. Agents prepare work, gather context and draft next actions inside defined workflows — with human review, approvals and audit trails."
        />
        <WorkflowDiagram
          className="mt-10"
          tone="navy"
          steps={[
            { label: "Healthcare Data", detail: "Structured operational data from approved sources." },
            { label: "AI Orchestration", detail: "Routing to the right agent for the workflow." },
            { label: "Specialized Agent", detail: "Task-scoped agent prepares the work." },
            { label: "Workflow Tool", detail: "Actions staged in the operational system." },
            { label: "Human Review", detail: "An operator approves, edits or rejects." },
            { label: "Audit / Reporting", detail: "Every step logged and reportable." },
          ]}
          caption="Conceptual demonstration of an agentic workflow design."
        />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="onNavy" size="lg">
            <Link to="/agentic-ai">Discuss AI Automation</Link>
          </Button>
          <Button asChild variant="outlineOnNavy" size="lg">
            <Link to="/healthcare-ai">Healthcare AI approach</Link>
          </Button>
        </div>
      </Section>

      <Section id="easymed">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="EasyMed"
              title="StellarOne Health's digital healthcare and telehealth platform"
              description="EasyMed brings telehealth, patient engagement and AI-assisted interaction into a mobile-first, multilingual experience."
            />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="brand" size="lg">
                <Link to="/easymed">Explore EasyMed</Link>
              </Button>
              <Button asChild variant="outlineBrand" size="lg">
                <Link to="/contact">Talk to Our Team</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{MEDICAL_DISCLAIMER}</p>
          </div>
          <FeatureGrid
            columns={2}
            features={[
              { title: "Telehealth", description: "Remote consultation workflows built for mobile access." },
              { title: "Patient engagement", description: "Reminders and structured follow-up communication." },
              { title: "Multilingual", description: "Designed to support interaction across languages." },
              { title: "Voice-enabled", description: "Voice-driven navigation for easier access." },
            ]}
          />
        </div>
      </Section>

      <Section tone="surface" id="industries">
        <SectionHeading
          eyebrow="Industries"
          title="Who we serve"
          description="Healthcare organizations across the US that need dependable operational support."
        />
        <FeatureGrid className="mt-10" features={INDUSTRIES} />
        <div className="mt-8">
          <Button asChild variant="outlineBrand" size="lg">
            <Link to="/industries">See industries</Link>
          </Button>
        </div>
      </Section>

      <Section id="why">
        <SectionHeading
          eyebrow="Why StellarOne"
          title="Built to operate, not just to advise"
          description="We combine healthcare operations delivery with a working understanding of healthcare technology and automation."
        />
        <FeatureGrid
          className="mt-10"
          features={[
            { title: "Operational delivery", description: "Our team works your queues daily inside your systems." },
            { title: "Modular engagement", description: "Start with one function and expand when it makes sense." },
            { title: "Process transparency", description: "Documented workflows, outcomes and operational reporting." },
            { title: "Technology alignment", description: "Automation candidates identified from real operational work." },
          ]}
          columns={4}
        />
        <div className="mt-8">
          <Button asChild variant="outlineBrand" size="lg">
            <Link to="/why-stellarone">Why StellarOne</Link>
          </Button>
        </div>
      </Section>

      <Section tone="surface" id="how-we-work">
        <SectionHeading
          eyebrow="How we work"
          title="A clear path from first conversation to steady-state operations"
        />
        <WorkflowDiagram className="mt-10" steps={HOW_WE_WORK} />
      </Section>

      <Section id="faq">
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <Accordion type="single" collapsible className="mt-8 max-w-3xl">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold text-navy">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <CtaBand />
    </>
  );
}
