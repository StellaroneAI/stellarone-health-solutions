import { useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calculator, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section, SectionHeading } from "./primitives";
import { assessRcm } from "@/lib/rcm-assessment";

const SPECIALTIES = ["Primary care", "Behavioral / mental health", "Multi-specialty", "Surgical specialty", "Other"];
const STEPS = ["Claim volume", "Specialty", "Denial rate"];
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function RcmAssessment() {
  const [step, setStep] = useState(0);
  const [volume, setVolume] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [rate, setRate] = useState("");
  const [average, setAverage] = useState("");
  const [share, setShare] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReturnType<typeof assessRcm> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  function advance(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (step === 0 && (!volume.trim() || !Number.isSafeInteger(Number(volume)) || Number(volume) < 1 || Number(volume) > 1_000_000)) {
      setError("Enter a monthly claim volume between 1 and 1,000,000.");
      return;
    }
    if (step === 1 && !specialty) { setError("Choose your specialty."); return; }
    if (step < 2) {
      setStep(step + 1);
      requestAnimationFrame(() => heading.current?.focus());
      return;
    }
    if (!rate.trim()) { setError("Enter your estimated denial rate."); return; }
    if (Boolean(average.trim()) !== Boolean(share.trim())) {
      setError("Add both financial assumptions, or leave both empty to see claim counts only.");
      return;
    }
    try {
      setResult(assessRcm({
        claimVolume: Number(volume), specialty, denialRate: Number(rate),
        ...(average.trim() ? { averageClaimValue: Number(average) } : {}),
        ...(share.trim() ? { recoverablePercent: Number(share) } : {}),
      }));
      requestAnimationFrame(() => heading.current?.focus());
    } catch (err) { setError(err instanceof Error ? err.message : "Please check your inputs."); }
  }

  const summary = result ? `RCM review: ${Number(volume).toLocaleString("en-US")} claims/month; ${specialty}; ${rate}% estimated denial rate; ${result.deniedClaims.toLocaleString("en-US")} estimated denied claims/month.${result.cashScenario !== null ? ` Hypothetical cash scenario ${currency.format(result.cashScenario)} using $${average} average allowed claim value and ${share}% assumed recoverable share; not a forecast.` : ""}` : "";

  return <Section tone="surface" id="rcm-assessment">
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      <div>
        <SectionHeading eyebrow="RCM assessment" title="Put your denial workload in perspective" description="Start with your monthly claims, specialty and estimated denial rate. Bring the context to a focused review with our healthcare team." />
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">Your inputs stay in this page until you choose to share them. Use aggregate business figures only, never patient information.</p>
        <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-navy"><Calculator aria-hidden="true" className="h-5 w-5 text-teal" /> Your numbers. Explicit assumptions.</div>
      </div>
      <div className="min-w-0 rounded-lg border border-border bg-card p-5 shadow-card sm:p-8">
        {!result ? <>
          <ol className="grid grid-cols-3 gap-2" aria-label="Assessment progress">{STEPS.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className={`border-t-2 pt-2 text-xs ${step >= index ? "border-teal text-navy" : "border-border text-muted-foreground"}`}><span className="block font-semibold">0{index + 1}</span><span>{label}</span></li>)}</ol>
          <h3 ref={heading} tabIndex={-1} className="mt-7 text-xl font-semibold text-navy outline-none">{step === 0 ? "How many claims each month?" : step === 1 ? "What is your specialty?" : "What share of claims is denied?"}</h3>
          <form onSubmit={advance} noValidate className="mt-5 space-y-5">
            {step === 0 ? <div><Label htmlFor="assessment-volume">Monthly claim volume</Label><Input id="assessment-volume" type="number" inputMode="numeric" min={1} max={1_000_000} step={1} value={volume} onChange={(e) => setVolume(e.target.value)} className="mt-2" aria-describedby={error ? "assessment-error" : undefined} /></div> : null}
            {step === 1 ? <fieldset><legend className="sr-only">Practice specialty</legend><div className="grid gap-2">{SPECIALTIES.map((item) => <label key={item} className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-3 text-sm text-foreground has-[:checked]:border-teal has-[:checked]:bg-secondary"><input type="radio" name="specialty" value={item} checked={specialty === item} onChange={() => setSpecialty(item)} className="accent-teal" />{item}</label>)}</div></fieldset> : null}
            {step === 2 ? <>
              <div><Label htmlFor="assessment-rate">Estimated denial rate (%)</Label><Input id="assessment-rate" type="number" inputMode="decimal" min={0} max={100} step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-2" aria-describedby={error ? "assessment-error" : undefined} /></div>
              <details className="border-t border-border pt-4"><summary className="cursor-pointer text-sm font-medium text-navy">Add a hypothetical cash-flow scenario</summary><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Optional: use your own average allowed amount, not billed charges, and an assumed recoverable share. No industry default or specialty multiplier is applied.</p><div className="mt-4 space-y-4"><div><Label htmlFor="assessment-average">Average allowed claim value (USD)</Label><Input id="assessment-average" type="number" inputMode="decimal" min={0.01} max={1_000_000} step="0.01" value={average} onChange={(e) => setAverage(e.target.value)} className="mt-2" /></div><div><Label htmlFor="assessment-share">Assumed recoverable share of denials (%)</Label><Input id="assessment-share" type="number" inputMode="decimal" min={0} max={100} step="0.1" value={share} onChange={(e) => setShare(e.target.value)} className="mt-2" /></div></div></details>
            </> : null}
            {error ? <p id="assessment-error" role="alert" className="text-sm text-destructive">{error}</p> : null}
            <div className="flex items-center justify-between gap-3">{step > 0 ? <Button type="button" variant="ghost" onClick={() => { setStep(step - 1); setError(""); }}><ArrowLeft aria-hidden="true" /> Back</Button> : <span />}<Button variant="brand" type="submit">{step === 2 ? "View assessment" : "Continue"}<ArrowRight aria-hidden="true" /></Button></div>
          </form>
        </> : <>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Your assessment</p>
          <h3 ref={heading} tabIndex={-1} className="mt-3 text-xl font-semibold text-navy outline-none">Estimated monthly denial workload</h3>
          <p className="mt-5 text-5xl font-bold text-navy" role="status">{result.deniedClaims.toLocaleString("en-US")}</p><p className="mt-2 text-sm text-muted-foreground">denied claims per month, based on your inputs</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-4 text-sm"><div><dt className="text-muted-foreground">Monthly claims</dt><dd className="mt-1 font-semibold text-navy">{Number(volume).toLocaleString("en-US")}</dd></div><div><dt className="text-muted-foreground">Denial rate</dt><dd className="mt-1 font-semibold text-navy">{rate}%</dd></div><div className="col-span-2"><dt className="text-muted-foreground">Specialty</dt><dd className="mt-1 font-semibold text-navy">{specialty}</dd></div></dl>
          {result.cashScenario !== null ? <div className="mt-5"><p className="text-sm text-muted-foreground">Hypothetical monthly cash recovery</p><p className="mt-1 break-words text-3xl font-bold text-teal">{currency.format(result.cashScenario)}</p><p className="mt-3 text-xs leading-relaxed text-muted-foreground">{volume} × {rate}% × {currency.format(Number(average))} average allowed amount × {share}% assumed recoverable share.</p></div> : null}
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">A scenario, not a recovery forecast or guaranteed result. Payer decisions, collectability, timing, costs and claim-level review are not modeled. Denial counts alone do not establish recoverable dollars.</p>
          <Button asChild variant="brand" className="mt-6 h-auto w-full whitespace-normal py-3"><Link to="/contact" search={{ assessment: summary }}>Discuss Your RCM Needs <ArrowRight aria-hidden="true" /></Link></Button>
          <Button variant="ghost" onClick={() => { setResult(null); setStep(0); setError(""); }} className="mt-3 w-full"><RotateCcw aria-hidden="true" /> Edit assessment</Button>
        </>}
      </div>
    </div>
  </Section>;
}