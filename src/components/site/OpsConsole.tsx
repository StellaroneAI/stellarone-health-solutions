import { Activity, ArrowRightLeft, CheckCircle2, ClipboardList, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const QUEUES = [
  { label: "Eligibility verification", status: "In progress", tone: "teal" as const },
  { label: "Claim submission", status: "On cadence", tone: "mint" as const },
  { label: "Payer follow-up", status: "In progress", tone: "teal" as const },
  { label: "Denial workqueue", status: "Escalation review", tone: "amber" as const },
  { label: "Payment posting", status: "On cadence", tone: "mint" as const },
];

const ACTIVITY = [
  "Eligibility batch verified",
  "Claims submitted to clearinghouse",
  "Denial root cause documented",
  "AR follow-up touches logged",
];

/**
 * Illustrative operations console visual. Represents the kind of queues our
 * operations team works — contains no real client, patient or performance data.
 */
export function OpsConsole({ className }: { className?: string }) {
  return (
    <div className={cn("min-w-0", className)} aria-hidden="true">
      <div className="overflow-hidden rounded-xl border border-on-navy/15 bg-navy shadow-lift">
        {/* Window bar */}
        <div className="flex items-center justify-between border-b border-on-navy/10 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-on-navy/25" />
            <span className="h-2 w-2 rounded-full bg-on-navy/25" />
            <span className="h-2 w-2 rounded-full bg-on-navy/25" />
          </div>
          <span className="text-[11px] font-medium tracking-wide text-on-navy-muted">
            Revenue cycle operations
          </span>
          <ShieldCheck className="h-3.5 w-3.5 text-teal-soft" />
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-[1.2fr_1fr]">
          {/* Work queues */}
          <div className="rounded-lg border border-on-navy/10 bg-navy-deep/60 p-3">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-3.5 w-3.5 text-teal-soft" />
              <p className="text-[11px] font-semibold uppercase tracking-wide text-on-navy-muted">
                Daily work queues
              </p>
            </div>
            <ul className="mt-3 space-y-2">
              {QUEUES.map((q) => (
                <li
                  key={q.label}
                  className="flex items-center justify-between gap-2 rounded-md bg-on-navy/5 px-2.5 py-2"
                >
                  <span className="min-w-0 truncate text-xs font-medium text-on-navy">
                    {q.label}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                      q.tone === "mint" && "bg-mint/20 text-mint",
                      q.tone === "teal" && "bg-teal/25 text-teal-soft",
                      q.tone === "amber" && "bg-on-navy/15 text-on-navy-muted",
                    )}
                  >
                    {q.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            {/* Flow indicator */}
            <div className="rounded-lg border border-on-navy/10 bg-navy-deep/60 p-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-3.5 w-3.5 text-teal-soft" />
                <p className="text-[11px] font-semibold uppercase tracking-wide text-on-navy-muted">
                  Workflow
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {["Queue", "Work", "Review", "Report"].map((s, i) => (
                  <div key={s} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                    <span
                      className="animate-flow h-1.5 w-full rounded-full bg-teal"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                    <span className="truncate text-[10px] text-on-navy-muted">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity log */}
            <div className="flex-1 rounded-lg border border-on-navy/10 bg-navy-deep/60 p-3">
              <div className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-teal-soft" />
                <p className="text-[11px] font-semibold uppercase tracking-wide text-on-navy-muted">
                  Documented activity
                </p>
              </div>
              <ul className="mt-3 space-y-2">
                {ACTIVITY.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-mint" />
                    <span className="text-[11px] leading-snug text-on-navy-muted">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-on-navy-muted">
        Illustrative view of daily operations. Not real client or patient data.
      </p>
    </div>
  );
}
