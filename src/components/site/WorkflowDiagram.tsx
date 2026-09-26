import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type WorkflowStep = {
  label: string;
  detail: string;
  icon?: LucideIcon;
};

export function WorkflowDiagram({
  steps,
  tone = "light",
  caption,
  className,
}: {
  steps: WorkflowStep[];
  tone?: "light" | "navy";
  caption?: string;
  className?: string;
}) {
  const onNavy = tone === "navy";
  return (
    <figure className={cn("min-w-0", className)}>
      <ol
        className={cn(
          "grid gap-3",
          "sm:grid-cols-2",
          steps.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        )}
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <li key={step.label} className="relative min-w-0">
              <div
                className={cn(
                  "h-full rounded-lg border p-4",
                  onNavy
                    ? "border-on-navy/15 bg-on-navy/5"
                    : "border-border bg-card shadow-card",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-md text-xs font-semibold",
                      onNavy ? "bg-teal/25 text-on-navy" : "bg-accent text-navy",
                    )}
                  >
                    {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : i + 1}
                  </span>
                  <p
                    className={cn(
                      "min-w-0 break-words text-sm font-semibold",
                      onNavy ? "text-on-navy" : "text-navy",
                    )}
                  >
                    {step.label}
                  </p>
                </div>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    onNavy ? "text-on-navy-muted" : "text-muted-foreground",
                  )}
                >
                  {step.detail}
                </p>
              </div>
              {i < steps.length - 1 ? (
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "animate-flow absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 sm:block",
                    (i + 1) % 2 === 0 && steps.length % 3 !== 0 ? "sm:hidden" : "",
                    onNavy ? "text-teal-soft" : "text-teal",
                  )}
                  style={{ animationDelay: `${i * 0.25}s` }}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
      {caption ? (
        <figcaption
          className={cn(
            "mt-4 text-xs",
            onNavy ? "text-on-navy-muted" : "text-muted-foreground",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
