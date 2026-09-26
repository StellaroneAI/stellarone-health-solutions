import {
  Activity,
  BarChart3,
  Bot,
  Brain,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileSearch,
  FileText,
  Gauge,
  HeartPulse,
  Layers,
  LineChart,
  Lock,
  PhoneCall,
  RefreshCcw,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Workflow,
} from "lucide-react";
import type { Feature } from "@/components/site/FeatureGrid";
import medicalBillingImage from "@/assets/services/medical-billing.jpg";
import claimsManagementImage from "@/assets/services/claims-management.jpg";
import arManagementImage from "@/assets/services/ar-management.jpg";
import denialManagementImage from "@/assets/services/denial-management.jpg";
import eligibilityBenefitsImage from "@/assets/services/eligibility-benefits.jpg";
import paymentPostingImage from "@/assets/services/payment-posting.jpg";
import insuranceFollowUpImage from "@/assets/services/insurance-follow-up.jpg";
import codingSupportImage from "@/assets/services/coding-support.jpg";
import revenueCycleReportingImage from "@/assets/services/revenue-cycle-reporting.jpg";
import arCleanupImage from "@/assets/services/ar-cleanup.jpg";

export const RCM_SERVICES: Feature[] = [
  {
    title: "Medical Billing",
    icon: FileText,
    image: medicalBillingImage,
    imageAlt: "Organized medical billing workspace with secure claims workflow",
    description:
      "Charge capture, charge entry and claim creation aligned to payer and specialty requirements.",
    points: ["Charge entry", "Claim scrubbing support", "Clean-claim workflows"],
  },
  {
    title: "Claims Management",
    icon: ClipboardList,
    image: claimsManagementImage,
    imageAlt: "Healthcare claims moving through a structured review workflow",
    description:
      "Submission, rejection handling and claim status tracking through to adjudication.",
    points: ["Claim submission support", "Clearinghouse rejections", "Status checking"],
  },
  {
    title: "AR Management",
    icon: LineChart,
    image: arManagementImage,
    imageAlt: "Prioritized accounts receivable work queues in a healthcare office",
    description:
      "Structured AR work queues prioritized by aging bucket, payer mix and dollar value.",
    points: ["Aging analysis", "Work queue prioritization", "Payer follow-up"],
  },
  {
    title: "Denial Management",
    icon: FileSearch,
    image: denialManagementImage,
    imageAlt: "Denied claims being categorized and routed for resolution",
    description:
      "Denial identification, categorization, appeal preparation and root-cause feedback loops.",
    points: ["Denial categorization", "Appeals support", "Root-cause analysis"],
  },
  {
    title: "Eligibility & Benefits",
    icon: UserCheck,
    image: eligibilityBenefitsImage,
    imageAlt: "Healthcare coverage and benefits verification workflow",
    description:
      "Verification of coverage, benefits and authorization requirements ahead of service.",
    points: ["Coverage verification", "Benefit checks", "Authorization tracking"],
  },
  {
    title: "Payment Posting",
    icon: CreditCard,
    image: paymentPostingImage,
    imageAlt: "Healthcare payment posting and reconciliation workspace",
    description:
      "ERA and manual posting with reconciliation, adjustments and variance identification.",
    points: ["ERA / EOB posting", "Reconciliation", "Underpayment flags"],
  },
  {
    title: "Insurance Follow-Up",
    icon: PhoneCall,
    image: insuranceFollowUpImage,
    imageAlt: "Organized insurance payer follow-up and communication workflow",
    description:
      "Consistent payer follow-up cadence with documented outcomes and next actions.",
    points: ["Payer calls and portals", "Documented outcomes", "Escalation paths"],
  },
  {
    title: "Coding Support",
    icon: Stethoscope,
    image: codingSupportImage,
    imageAlt: "Clinical documentation and medical coding review workspace",
    description:
      "Coding support and documentation review coordinated with your clinical and billing teams.",
    points: ["Code review support", "Documentation queries", "Specialty alignment"],
  },
  {
    title: "Revenue Cycle Reporting",
    icon: BarChart3,
    image: revenueCycleReportingImage,
    imageAlt: "Executive healthcare revenue cycle reporting workspace",
    description:
      "Operational reporting on AR, denials, collections and work completed, on your cadence.",
    points: ["AR and aging reports", "Denial trend reporting", "Productivity visibility"],
  },
  {
    title: "AR Cleanup",
    icon: RefreshCcw,
    image: arCleanupImage,
    imageAlt: "Accounts receivable backlog organized into clear work queues",
    description:
      "Project-based cleanup of aged or backlogged AR, including legacy system balances.",
    points: ["Backlog projects", "Aged AR review", "Legacy balance resolution"],
  },
];

export const INDUSTRIES: Feature[] = [
  {
    title: "Medical Groups & Physician Practices",
    icon: Stethoscope,
    description:
      "Single and multi-specialty groups needing dependable billing, AR and denial operations.",
  },
  {
    title: "Behavioral & Mental Health",
    icon: Brain,
    description:
      "Organizations with authorization-heavy workflows, session-based billing and varied payer rules.",
  },
  {
    title: "Billing Companies",
    icon: Layers,
    description:
      "Billing organizations looking for scalable delivery capacity across client portfolios.",
  },
  {
    title: "Healthcare Technology Companies",
    icon: Workflow,
    description:
      "Platforms that need an operational services layer alongside their software product.",
  },
  {
    title: "Clinics & Outpatient Services",
    icon: HeartPulse,
    description:
      "Outpatient and ambulatory settings needing eligibility, posting and follow-up support.",
  },
  {
    title: "Healthcare Operations Teams",
    icon: Activity,
    description:
      "Back-office teams seeking workflow optimization and additional operational bandwidth.",
  },
];

export const AGENT_CONCEPTS: Feature[] = [
  {
    title: "AR Agent",
    icon: LineChart,
    description:
      "Assembles and prioritizes AR work queues, prepares follow-up context and drafts next actions for human review.",
  },
  {
    title: "Claims Agent",
    icon: ClipboardList,
    description:
      "Checks claim status across payer sources and summarizes exceptions that need an operator decision.",
  },
  {
    title: "Denial Agent",
    icon: FileSearch,
    description:
      "Identifies and categorizes denials, groups recurring reasons and prepares appeal starting points.",
  },
  {
    title: "Eligibility Agent",
    icon: UserCheck,
    description:
      "Runs eligibility and benefit verification steps and highlights coverage gaps before service.",
  },
  {
    title: "Reporting Agent",
    icon: BarChart3,
    description:
      "Compiles operational summaries from structured revenue cycle data on a defined schedule.",
  },
  {
    title: "Operations Agent",
    icon: Gauge,
    description:
      "Coordinates hand-offs between workflows, tracks queue status and surfaces blockers to supervisors.",
  },
];

export const GOVERNANCE: Feature[] = [
  { title: "Human-in-the-loop", icon: UserCheck, description: "People approve or reject agent-prepared actions before anything is finalized." },
  { title: "Auditability", icon: FileText, description: "Each step is recorded so decisions and actions can be reviewed after the fact." },
  { title: "Role-based access", icon: Lock, description: "Access to data and actions is scoped to the role performing the work." },
  { title: "Controlled automation", icon: ShieldCheck, description: "Automation is scoped to defined workflows with explicit boundaries." },
  { title: "Secure integrations", icon: Layers, description: "Integrations are designed around least-privilege access to source systems." },
  { title: "Workflow approvals", icon: CalendarCheck, description: "Approval gates sit between preparation and execution of any action." },
  { title: "Monitoring", icon: Gauge, description: "Queue throughput, exceptions and agent behavior are monitored continuously." },
  { title: "Logging", icon: ClipboardList, description: "Structured logs support operational review and internal reporting." },
];

export const EASYMED_FEATURES: Feature[] = [
  { title: "Telehealth", icon: PhoneCall, description: "Remote consultation workflows designed for mobile-first patient access." },
  { title: "AI-assisted interaction", icon: Bot, description: "Assistive guidance that helps people navigate healthcare interactions and next steps." },
  { title: "Multilingual experience", icon: Layers, description: "Interfaces designed to support interaction across multiple languages." },
  { title: "Voice-enabled interaction", icon: Activity, description: "Voice-driven navigation for users who prefer speaking over typing." },
  { title: "Patient engagement", icon: HeartPulse, description: "Reminders, follow-ups and structured communication across the care journey." },
  { title: "Mobile-first healthcare", icon: Gauge, description: "Built for small screens and low-friction access from day one." },
  { title: "Digital healthcare workflows", icon: Workflow, description: "Digitized intake, scheduling and follow-up steps for care teams." },
];

export const MEDICAL_DISCLAIMER =
  "AI-assisted healthcare features are designed to support healthcare experiences and do not replace professional medical diagnosis or treatment.";

export const FORM_PRIVACY_NOTICE =
  "Please do not submit patient medical information or other sensitive health information through this form.";
