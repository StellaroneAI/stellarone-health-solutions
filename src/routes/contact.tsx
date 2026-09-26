import { createFileRoute } from "@tanstack/react-router";
import React, { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Section, SectionHeading, Card, Disclaimer, Container } from "@/components/site/primitives";
import { PageHero } from "@/components/site/PageHero";
import { FORM_PRIVACY_NOTICE } from "@/content/site";
import { submitLead, type LeadInput } from "@/lib/leads";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact StellarOne Health",
      description:
        "Talk to the StellarOne Health team about revenue cycle management, agentic AI for healthcare operations, healthcare automation or EasyMed. Share your organization type and current setup to start a scoped conversation.",
      path: "/contact",
    }),
  component: ContactPage,
});

const SERVICE_OPTIONS = [
  "Medical Billing",
  "AR Management",
  "Denial Management",
  "Eligibility",
  "Claims Management",
  "Full RCM",
  "Agentic AI",
  "Healthcare Automation",
  "EasyMed",
  "Strategic Partnership",
  "Other",
];

const ORG_TYPES = [
  "Medical Group / Physician Practice",
  "Behavioral / Mental Health Organization",
  "Hospital / Health System",
  "Clinic / Outpatient Services",
  "Billing Company",
  "Healthcare Technology Company",
  "Other",
];

const VOLUMES = [
  "Under 1,000",
  "1,000 – 5,000",
  "5,000 – 20,000",
  "20,000 – 50,000",
  "Over 50,000",
  "Not sure",
];

const RCM_SETUPS = ["In-house team", "Outsourced vendor", "Hybrid", "Building now", "Not sure"];

const EMPTY: LeadInput = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  jobTitle: "",
  organizationType: "",
  serviceInterest: "",
  monthlyClaimVolume: "",
  currentRCM: "",
  currentPMS: "",
  challenge: "",
  message: "",
};

type Errors = Partial<Record<keyof LeadInput, string>>;

const FREE_EMAIL = /@(gmail|yahoo|hotmail|outlook|aol|icloud|proton(mail)?)\./i;

function validate(values: LeadInput): Errors {
  const errors: Errors = {};
  const required: [keyof LeadInput, string][] = [
    ["firstName", "First name is required."],
    ["lastName", "Last name is required."],
    ["company", "Company is required."],
    ["email", "Work email is required."],
    ["organizationType", "Please select an organization type."],
    ["serviceInterest", "Please select a service."],
  ];
  for (const [field, message] of required) {
    if (!values[field].trim()) errors[field] = message;
  }

  if (values.email.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      errors.email = "Enter a valid email address.";
    } else if (FREE_EMAIL.test(values.email.trim())) {
      errors.email = "Please use your work email address.";
    }
  }
  if (values.phone.trim() && !/^[+()\-\s\d.]{7,20}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  for (const field of ["firstName", "lastName", "company", "jobTitle", "currentPMS"] as const) {
    if (values[field].length > 100) errors[field] = "Please keep this under 100 characters.";
  }
  if (values.challenge.length > 500) errors.challenge = "Please keep this under 500 characters.";
  if (values.message.length > 1500) errors.message = "Please keep this under 1500 characters.";
  return errors;
}

function Field({
  id,
  label,
  error,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  required?: boolean | undefined;
  children: React.ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <Label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-destructive">
            *
          </span>
        ) : null}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const selectClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

function ContactPage() {
  const [values, setValues] = useState<LeadInput>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const successRef = React.useRef<HTMLDivElement>(null);
  const [formError, setFormError] = useState("");
  React.useEffect(() => { if (status === "success") successRef.current?.focus(); }, [status]);

  const set = (field: keyof LeadInput) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      setFormError("Please correct the highlighted fields and try again.");
      return;
    }
    setFormError("");
    setStatus("loading");
    const result = await submitLead(values);
    if (result.ok) {
      setStatus("success");
      setValues(EMPTY);
    } else {
      setStatus("error");
      setFormError(result.error);
    }
  }

  const err = (field: keyof LeadInput) => errors[field];
  const aria = (field: keyof LeadInput) =>
    errors[field]
      ? ({ "aria-invalid": true, "aria-describedby": `${field}-error` } as const)
      : {};

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to StellarOne"
        description="Tell us about your organization, current setup and what you're trying to solve. Our healthcare team will follow up to scope a practical next step."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="What happens next"
              title="A scoped conversation, not a sales sequence"
              description="We'll review what you share, confirm whether we're a realistic fit, and propose a modular or broader scope to discuss."
            />
            <Card>
              <h3 className="text-base font-semibold text-navy">Useful details to include</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Specialties and payer mix</li>
                <li>Current practice management or billing system</li>
                <li>Approximate monthly claim volume</li>
                <li>The single biggest operational challenge right now</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-navy">Reach our leadership directly</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Praveen Jayaraman — Founder &amp; Chief Executive Officer
              </p>
              <a
                href="mailto:Praveen.Jayaraman@stellaronehealth.com"
                className="mt-2 inline-flex items-center gap-2 break-all text-sm font-medium text-navy underline-offset-4 hover:underline"
              >
                <Mail className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                Praveen.Jayaraman@stellaronehealth.com
              </a>
            </Card>
            <Disclaimer>{FORM_PRIVACY_NOTICE}</Disclaimer>
          </div>

          <Card className="min-w-0">
            {status === "success" ? (
              <div ref={successRef} tabIndex={-1} className="py-8 text-center outline-none" role="status">
                <CheckCircle2 className="mx-auto h-10 w-10 text-teal" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-semibold text-navy">Thank you — inquiry received</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Our healthcare team will review your details and follow up at the work email you
                  provided.
                </p>
                <Button
                  variant="outlineBrand"
                  size="lg"
                  className="mt-6"
                  onClick={() => setStatus("idle")}
                >
                  Send another inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 className="text-xl font-semibold text-navy">Business inquiry</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fields marked * are required.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field id="firstName" label="First Name" required error={err("firstName")}>
                    <Input
                      id="firstName"
                      autoComplete="given-name"
                      value={values.firstName}
                      onChange={(e) => set("firstName")(e.target.value)}
                      {...aria("firstName")}
                    />
                  </Field>
                  <Field id="lastName" label="Last Name" required error={err("lastName")}>
                    <Input
                      id="lastName"
                      autoComplete="family-name"
                      value={values.lastName}
                      onChange={(e) => set("lastName")(e.target.value)}
                      {...aria("lastName")}
                    />
                  </Field>
                  <Field id="company" label="Company" required error={err("company")}>
                    <Input
                      id="company"
                      autoComplete="organization"
                      value={values.company}
                      onChange={(e) => set("company")(e.target.value)}
                      {...aria("company")}
                    />
                  </Field>
                  <Field id="jobTitle" label="Job Title" error={err("jobTitle")}>
                    <Input
                      id="jobTitle"
                      autoComplete="organization-title"
                      value={values.jobTitle}
                      onChange={(e) => set("jobTitle")(e.target.value)}
                      {...aria("jobTitle")}
                    />
                  </Field>
                  <Field id="email" label="Work Email" required error={err("email")}>
                    <Input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => set("email")(e.target.value)}
                      {...aria("email")}
                    />
                  </Field>
                  <Field id="phone" label="Phone" error={err("phone")}>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      {...aria("phone")}
                    />
                  </Field>

                  <Field
                    id="organizationType"
                    label="Organization Type"
                    required
                    error={err("organizationType")}
                  >
                    <select
                      id="organizationType"
                      className={selectClass}
                      value={values.organizationType}
                      onChange={(e) => set("organizationType")(e.target.value)}
                      {...aria("organizationType")}
                    >
                      <option value="">Select an option</option>
                      {ORG_TYPES.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    id="serviceInterest"
                    label="Service Interested In"
                    required
                    error={err("serviceInterest")}
                  >
                    <select
                      id="serviceInterest"
                      className={selectClass}
                      value={values.serviceInterest}
                      onChange={(e) => set("serviceInterest")(e.target.value)}
                      {...aria("serviceInterest")}
                    >
                      <option value="">Select an option</option>
                      {SERVICE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="monthlyClaimVolume" label="Monthly Claim Volume">
                    <select
                      id="monthlyClaimVolume"
                      className={selectClass}
                      value={values.monthlyClaimVolume}
                      onChange={(e) => set("monthlyClaimVolume")(e.target.value)}
                    >
                      <option value="">Select an option</option>
                      {VOLUMES.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="currentRCM" label="Current RCM Setup">
                    <select
                      id="currentRCM"
                      className={selectClass}
                      value={values.currentRCM}
                      onChange={(e) => set("currentRCM")(e.target.value)}
                    >
                      <option value="">Select an option</option>
                      {RCM_SETUPS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    id="currentPMS"
                    label="Current PMS / Billing System"
                    error={err("currentPMS")}
                    className="sm:col-span-2"
                  >
                    <Input
                      id="currentPMS"
                      value={values.currentPMS}
                      onChange={(e) => set("currentPMS")(e.target.value)}
                      {...aria("currentPMS")}
                    />
                  </Field>
                  <Field
                    id="challenge"
                    label="Primary Challenge"
                    error={err("challenge")}
                    className="sm:col-span-2"
                  >
                    <Input
                      id="challenge"
                      maxLength={500}
                      value={values.challenge}
                      onChange={(e) => set("challenge")(e.target.value)}
                      {...aria("challenge")}
                    />
                  </Field>
                  <Field
                    id="message"
                    label="Message"
                    error={err("message")}
                    className="sm:col-span-2"
                  >
                    <Textarea
                      id="message"
                      rows={5}
                      maxLength={1500}
                      value={values.message}
                      onChange={(e) => set("message")(e.target.value)}
                      {...aria("message")}
                    />
                  </Field>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  {FORM_PRIVACY_NOTICE}
                </p>

                {formError ? (
                  <p role="alert" className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                    {formError}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  variant="brand"
                  size="xl"
                  className="mt-6 w-full sm:w-auto"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    "Submit inquiry"
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </Section>

      <div className="bg-surface">
        <Container className="py-10">
          <p className="text-sm text-muted-foreground">
            StellarOne Health Technologies Pvt. Ltd. — supporting US healthcare organizations with
            revenue cycle operations, healthcare automation and digital health technology.
          </p>
        </Container>
      </div>
    </>
  );
}
