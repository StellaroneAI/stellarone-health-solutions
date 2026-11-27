import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, HeartPulse, LineChart, LockKeyhole, Settings2, ShieldCheck, Stethoscope, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { OpsConsole } from "@/components/site/OpsConsole";
import { PageHero } from "@/components/site/PageHero";
import { WorkflowDiagram } from "@/components/site/WorkflowDiagram";
import { Card, Disclaimer, Section, SectionHeading } from "@/components/site/primitives";
import { INDUSTRIES, MEDICAL_DISCLAIMER, RCM_SERVICES } from "@/content/site";
import { pageHead } from "@/lib/seo";
import { RcmAssessment } from "@/components/site/RcmAssessment";
import { SystemCompatibility } from "@/components/site/SystemCompatibility";
import { InsightGrid } from "@/components/site/InsightGrid";

export const Route = createFileRoute("/")({
  head: () => pageHead({ title: "Healthcare RCM, Automation & AI", description: "StellarOne Health combines US healthcare expertise, revenue cycle management, automation and Agentic AI to support stronger healthcare operations.", path: "/" }),
  component: Home,
});

const PILLARS = [
  { title: "Revenue Cycle Management", icon: LineChart, description: "Modular or end-to-end operational support delivered as an extension of your team." },
  { title: "Healthcare Automation", icon: Settings2, description: "Practical automation designed around repetitive workflows, exceptions and review points." },
  { title: "Agentic AI", icon: Bot, description: "Conceptual AI-agent workflows designed with people in control and actions auditable." },
  { title: "Digital Healthcare", icon: HeartPulse, description: "EasyMed supports mobile-first telehealth, patient engagement and digital workflows." },
];

const MODEL = [
  { label: "Assess", detail: "Understand your systems, workflows, volumes and operational priorities." },
  { label: "Design", detail: "Define service scope, ownership, controls, cadence and escalation paths." },
  { label: "Implement", detail: "Transition access, documentation and queues with your team." },
  { label: "Optimize", detail: "Review patterns, improve workflows and identify sensible automation opportunities." },
];

const AGENTS = [
  { title: "Eligibility Agent", description: "Prepares coverage and benefit findings and highlights exceptions for review." },
  { title: "Denial Agent", description: "Categorizes denial reasons and prepares resolution context for an operator." },
  { title: "AR Agent", description: "Organizes follow-up priorities and assembles the context needed for the next action." },
  { title: "Credentialing Agent", description: "Tracks defined credentialing steps, missing information and follow-up items." },
  { title: "Reporting Agent", description: "Compiles structured operational information into review-ready summaries." },
];

function Home() {
  return <>
    <PageHero eyebrow="Healthcare Operations & Technology" title="Intelligent Healthcare Operations. Built for Better Outcomes." description="StellarOne Health combines US healthcare expertise, Revenue Cycle Management, automation and Agentic AI to help healthcare organizations improve operational efficiency and build a stronger revenue cycle." primaryCta={{ label: "Request an RCM Assessment", to: "/contact" }} secondaryCta={{ label: "Explore Healthcare AI", to: "/healthcare-ai" }} aside={<OpsConsole />} />

    <section className="border-b border-border bg-background"><div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8"><p className="text-center text-xs font-semibold uppercase tracking-wide text-navy sm:text-sm">Healthcare Expertise <span className="mx-2 text-teal">•</span> RCM Operations <span className="mx-2 text-teal">•</span> Automation <span className="mx-2 text-teal">•</span> AI</p></div></section>

    <Section><SectionHeading eyebrow="Our foundation" title="Healthcare Expertise Meets Intelligent Technology" description="We combine people who understand healthcare operations with disciplined delivery and technology selected for real workflow needs." align="center" /><div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3"><Card><Stethoscope className="h-6 w-6 text-teal" aria-hidden="true" /><h3 className="mt-4 text-lg font-semibold text-navy">Healthcare context</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Workflows are considered in the context of providers, payers, systems and patients.</p></Card><Card><Workflow className="h-6 w-6 text-teal" aria-hidden="true" /><h3 className="mt-4 text-lg font-semibold text-navy">Operational delivery</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Our focus is the daily work, clear ownership and documented next actions.</p></Card><Card><ShieldCheck className="h-6 w-6 text-teal" aria-hidden="true" /><h3 className="mt-4 text-lg font-semibold text-navy">Responsible technology</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Automation and AI are applied with boundaries, oversight and a defined purpose.</p></Card></div></Section>

    <Section tone="surface"><SectionHeading eyebrow="What we do" title="Four connected capabilities for healthcare organizations" description="RCM comes first. Automation, Agentic AI and EasyMed extend how StellarOne can support your organization." /><FeatureGrid className="mt-10" columns={4} features={PILLARS} /></Section>

    <Section><div className="mx-auto max-w-3xl text-center"><SectionHeading eyebrow="Revenue Cycle Management" title="Your RCM Team. Extended by StellarOne." description="Choose one function or broader end-to-end support. Our team works inside your systems, to your workflows, with documented outcomes and clear escalation paths." align="center" /><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild variant="brand" size="xl"><Link to="/contact">Request an RCM Assessment</Link></Button><Button asChild variant="outlineBrand" size="xl"><Link to="/contact">Discuss an RCM Partnership</Link></Button></div></div><FeatureGrid className="mt-12" columns={3} features={RCM_SERVICES} /></Section>

    <SystemCompatibility />
    <RcmAssessment />
    <Section tone="surface"><SectionHeading eyebrow="RCM engagement model" title="Built Around Your Existing Workflow" description="A clear approach from first assessment through steady-state improvement." align="center" /><WorkflowDiagram className="mt-10" steps={MODEL} /></Section>

    <Section><div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center"><div><SectionHeading eyebrow="Healthcare Automation" title="Reduce repetitive work. Preserve human judgment." description="We identify bounded workflows where automation can organize work, move information and surface exceptions—without removing people from decisions that need context."/><Button asChild variant="brand" size="lg" className="mt-6 h-auto max-w-full whitespace-normal py-3"><Link to="/healthcare-automation">Discuss an Automation Opportunity <ArrowRight aria-hidden="true" /></Link></Button></div><FeatureGrid columns={2} features={[{title:"Workflow mapping",description:"Understand the real process before introducing automation."},{title:"Exception handling",description:"Design for the cases that do not follow the standard path."},{title:"Human review",description:"Keep approvals and judgment at defined decision points."},{title:"Operational visibility",description:"Make status, ownership and next actions easier to review."}]} /></div></Section>

    <Section tone="navy"><SectionHeading onNavy eyebrow="Agentic AI" title="Healthcare Workflows, Redesigned Around Intelligent AI Agents" description="Agentic AI can prepare work, interpret context and coordinate steps within defined boundaries while operators retain review and approval." /><div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Card tone="navy"><p className="text-xs font-semibold uppercase tracking-wide text-teal-soft">AI + Human Expertise</p><h3 className="mt-3 text-xl font-semibold text-on-navy">Designed to assist—not replace—healthcare teams</h3><p className="mt-3 text-sm leading-relaxed text-on-navy-muted">Human oversight, access control, approvals and auditability are part of the workflow design.</p><Button asChild variant="onNavy" size="lg" className="mt-6"><Link to="/agentic-ai">Explore Healthcare AI</Link></Button></Card><FeatureGrid tone="navy" columns={3} features={AGENTS} /></div><p className="mt-6 text-xs text-on-navy-muted">Conceptual demonstration. These examples describe potential workflow designs, not confirmed production deployments.</p></Section>

    <Section><div className="grid gap-10 lg:grid-cols-2 lg:items-center"><div><SectionHeading eyebrow="Meet EasyMed" title="Digital Healthcare, Designed Around the Patient" description="EasyMed is StellarOne Health’s digital healthcare and telehealth platform, designed around mobile-first access, patient engagement, multilingual experiences and voice-enabled interaction."/><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild variant="brand" size="lg"><Link to="/easymed">Explore EasyMed</Link></Button><Button asChild variant="outlineBrand" size="lg"><Link to="/contact">Talk to Our Team</Link></Button></div><p className="mt-5 text-xs leading-relaxed text-muted-foreground">{MEDICAL_DISCLAIMER}</p></div><FeatureGrid columns={2} features={[{title:"Telehealth",description:"Remote consultation workflows designed for accessible digital care."},{title:"Patient engagement",description:"Structured reminders and follow-up communication."},{title:"Multilingual experience",description:"Interfaces designed to support interaction across languages."},{title:"Voice-enabled access",description:"Navigation for people who prefer speaking over typing."}]} /></div></Section>

    <Section tone="surface"><SectionHeading eyebrow="Who we serve" title="Built for organizations across US healthcare" description="Support shaped around the operating model, workflows and growth priorities of each organization."/><FeatureGrid className="mt-10" columns={3} features={INDUSTRIES} /><Button asChild variant="outlineBrand" size="lg" className="mt-8"><Link to="/industries">Explore industries</Link></Button></Section>

    <Section><SectionHeading eyebrow="Why StellarOne" title="Healthcare operations and technology, considered together"/><FeatureGrid className="mt-10" columns={4} features={[{title:"Healthcare Expertise",description:"Operational decisions grounded in how US healthcare workflows function."},{title:"RCM Experience",description:"Support across core revenue cycle functions, from eligibility through reporting."},{title:"Technology",description:"A practical understanding of systems, integrations and workflow constraints."},{title:"Flexible Engagement",description:"Modular services, broader RCM coverage or a focused automation opportunity."}]} /></Section>

    <Section tone="navy"><div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center"><SectionHeading onNavy eyebrow="Security & Trust" title="Built With Healthcare Trust in Mind" description="Healthcare workflows require careful handling, defined access and accountable decisions. Our approach begins with those expectations."/><FeatureGrid tone="navy" columns={2} features={[{title:"Data protection",icon:LockKeyhole,description:"Information access is considered in the context of the people and workflow that need it."},{title:"Role-based access",icon:ShieldCheck,description:"Permissions and responsibilities are designed around defined operational roles."},{title:"Responsible AI",icon:Bot,description:"AI-assisted steps retain boundaries, review points and traceable decisions."},{title:"Compliance-oriented design",icon:Workflow,description:"Requirements are addressed during scoping without making unsupported certification claims."}]} /></div></Section>

    <Section><SectionHeading eyebrow="Insights" title="Practical perspectives for healthcare leaders" description="Explore focused thinking on RCM operations, authorization workflows and responsible AI."/><InsightGrid /><Button asChild variant="outlineBrand" size="lg" className="mt-8"><Link to="/insights">View all insights</Link></Button></Section>

    <Section tone="surface"><div className="mx-auto max-w-3xl text-center"><SectionHeading eyebrow="Our perspective" title="Human expertise + healthcare operations + technology + automation + AI" description="We understand healthcare operations. We understand RCM. We understand technology. And we know where automation and AI can actually create value." align="center"/><div className="mt-6"><Disclaimer>Specific scope, technical requirements and operational goals are evaluated with each organization. No performance outcome is guaranteed.</Disclaimer></div></div></Section>
    <CtaBand title="Start with the healthcare operation that matters most" description="Tell us about your RCM needs or the workflow you want to improve. We’ll begin with a practical, scoped conversation." primaryLabel="Request an RCM Assessment" secondaryLabel="Talk to StellarOne" />
  </>;
}