import priorAuthImage from "@/assets/services/eligibility-benefits.jpg";
import auditImage from "@/assets/services/revenue-cycle-reporting.jpg";
import denialsImage from "@/assets/services/denial-management.jpg";

export interface InsightArticle {
  slug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ai: boolean;
  sections: { title: string; paragraphs: string[]; checklist?: string[] }[];
  sources: { label: string; url: string }[];
}

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    slug: "prior-authorization-backlogs",
    category: "RCM Operations",
    title: "Managing payer prior authorization backlogs",
    description: "A practical approach to ownership, missing documentation, payer follow-up and escalation in authorization work queues.",
    image: priorAuthImage,
    imageAlt: "Illustration of an organized coverage and authorization review workspace",
    ai: false,
    sections: [
      { title: "Separate the queue before adding capacity", paragraphs: ["A single list of pending authorizations hides different problems. An incomplete request, a submitted request awaiting a payer decision and a denied request each need a different next action. Separate these stages before assigning additional staff or introducing automation.", "This is an operational framework, not a promise of faster approvals. Clinical urgency and the need for care must be assessed by the clinical team, not inferred from a billing queue."] },
      { title: "Make each hand-off actionable", paragraphs: ["For each request, record a responsible owner, the payer, the requested service, submission confirmation, missing documentation and the next follow-up date in your authorized system. Keep a clear distinction between work waiting on the practice and work waiting on the payer."], checklist: ["Confirm payer-specific documentation before submission.", "Record the submission reference and current status.", "Route clinical documentation questions to the appropriate care team.", "Escalate approaching deadlines through a defined review path."] },
      { title: "Use the right deadline for the right payer", paragraphs: ["CMS guidance for CMS-0057-F describes maximum decision timeframes of 72 hours for expedited requests and seven calendar days for standard requests for impacted payers other than Qualified Health Plan issuers on the Federally-facilitated Exchanges. These provisions apply to medical items and services, excluding drugs. Decisions must be made as expeditiously as the patient's condition requires.", "Do not apply these timeframes to every insurance plan or every request. Confirm the applicable program, effective requirements, permitted extensions and payer instructions. A queue reminder is not a substitute for a clinical escalation or the plan's formal appeal process."] },
      { title: "Review causes, not only queue size", paragraphs: ["At a regular operations review, examine incomplete submissions, repeated requests for information and time spent waiting at each stage. Those patterns help distinguish a documentation issue from a follow-up issue. Start improvements with a bounded workflow and confirm results against your own records.", "StellarOne's eligibility and benefits work includes authorization tracking. Scope, access, payer requirements and escalation ownership are agreed with your organization before work begins."] },
    ],
    sources: [{ label: "CMS: Improving Prior Authorization Processes — timeframes, scope and exceptions", url: "https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/frequently-asked-questions/improving-prior-authorization-processes" }],
  },
  {
    slug: "human-in-the-loop-audit-trails",
    category: "Responsible Healthcare AI",
    title: "Human-in-the-loop AI needs an audit trail",
    description: "How review gates, decision records and least-privilege access fit into a conceptual healthcare operations AI workflow.",
    image: auditImage,
    imageAlt: "Illustration of structured operational reporting and review records",
    ai: true,
    sections: [
      { title: "Define what the person actually controls", paragraphs: ["A human-in-the-loop workflow needs more than an approval button. Define which actions an assistant may prepare, who can authorize execution and what happens when information is missing or conflicting. In a conceptual denial workflow, an agent might organize a denial reason and draft a next action; an authorized operator still reviews the source information and decides whether to proceed.", "These examples are a Conceptual demonstration, not a claim that StellarOne has deployed production AI agents."] },
      { title: "Record the decision, not just the output", paragraphs: ["NIST's voluntary AI Risk Management Framework and its Govern playbook emphasize documented responsibilities, risk-management processes and ongoing review. Applied to a healthcare operations workflow, those principles suggest recording enough context to explain how a proposed action became an approved action."], checklist: ["Identify the workflow, source references and time of preparation.", "Record the model or tool version and the proposed action.", "Identify the authorized reviewer and their decision.", "Record material edits, execution outcome and exceptions.", "Define retention, access and monitoring requirements with the organization."] },
      { title: "Keep logs proportionate and access restricted", paragraphs: ["An audit trail should not become an uncontrolled second copy of sensitive records. Use references to authorized source systems where appropriate; determine what must be retained with privacy and security reviewers. Restrict access to the people who need it and avoid collecting unnecessary patient information.", "An agent's permission to draft a task should not automatically grant permission to send a communication, alter a claim or change a record. Keep preparation, approval and execution as distinct permissions."] },
      { title: "Review the exceptions", paragraphs: ["Monitor rejected proposals, missing-source cases and repeated operator edits. These are useful signals for adjusting the workflow boundary or the review criteria. Define a stop path when a tool fails or a proposed action falls outside the agreed scope.", "A framework is not a certification. Referencing NIST does not establish compliance or validate a particular deployment; the organization must evaluate its own controls and applicable requirements."] },
    ],
    sources: [{ label: "NIST: AI Risk Management Framework — voluntary risk-management guidance", url: "https://www.nist.gov/itl/ai-risk-management-framework" }, { label: "NIST AI RMF Playbook: Govern — documentation, roles and monitoring", url: "https://airc.nist.gov/airmf-resources/playbook/govern/" }],
  },
  {
    slug: "denial-review-before-automation",
    category: "Denial Management",
    title: "What to review before automating denial follow-up",
    description: "A practical checklist for denial categories, source records, deadlines and human review before adding automation.",
    image: denialsImage,
    imageAlt: "Illustration of denied claims organized into review and resolution queues",
    ai: false,
    sections: [
      { title: "Start with a consistent definition", paragraphs: ["A clearinghouse rejection and a payer denial are not the same event. Before analyzing a queue, define which claims belong in each category and how corrected or resubmitted claims are counted. A consistent denominator matters as much as the headline denial percentage.", "Use your own remittance and billing records to establish a baseline. A generic industry percentage cannot explain your specialty, payer mix or the quality of your documentation."] },
      { title: "Give each category a resolution path", paragraphs: ["Group recurring issues such as coverage, authorization, documentation and coding questions. For each category, define the source record an operator must inspect, the role that owns the next step and the applicable payer deadline. Coding and clinical documentation questions should be referred to the appropriate qualified team."], checklist: ["Distinguish rejections, denials and underpayments.", "Confirm the payer's stated reason against source records.", "Document the permitted correction or appeal path.", "Assign an owner and a follow-up date.", "Track resolution and feed recurring causes upstream."] },
      { title: "Automate preparation before execution", paragraphs: ["A bounded first use of automation is organizing a queue or assembling the evidence an operator needs. Avoid automatically resubmitting or appealing a claim when the underlying information is incomplete. Define explicit exception paths and retain human approval for consequential actions.", "The NIST AI RMF provides voluntary risk-management guidance for AI-enabled systems. It is a useful reference when considering roles, documentation and monitoring; it is not evidence of certification or a guarantee that an automated workflow is appropriate."] },
      { title: "Treat a recovery calculator as a scenario", paragraphs: ["Claim volume multiplied by a denial percentage estimates a count of denied claims, not recoverable dollars. A cash-flow scenario also needs an average allowed claim value and an explicitly assumed recoverable share. Even then, it does not account for payer decisions, collection timing, appeal costs or duplicate claims.", "StellarOne's denial management services include categorization, appeal preparation and root-cause feedback. A scoped review of your own records is the next step before setting targets or choosing an automation workflow."] },
    ],
    sources: [{ label: "NIST: AI Risk Management Framework — guidance for evaluating AI-enabled workflows", url: "https://www.nist.gov/itl/ai-risk-management-framework" }],
  },
];