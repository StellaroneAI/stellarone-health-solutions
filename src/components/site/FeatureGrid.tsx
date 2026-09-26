import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Feature = {
  title: string;
  description: string;
  icon?: LucideIcon | undefined;
  points?: string[] | undefined;
  image?: string | undefined;
  imageAlt?: string | undefined;
};

export function FeatureGrid({
  features,
  columns = 3,
  tone = "light",
  className,
}: {
  features: Feature[];
  columns?: 2 | 3 | 4;
  tone?: "light" | "navy";
  className?: string;
}) {
  const onNavy = tone === "navy";
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  } as const;

  return (
    <ul className={cn("grid gap-4", cols[columns], className)}>
      {features.map((f) => {
        const Icon = f.icon;
        return (
          <li
            key={f.title}
            className={cn(
              "min-w-0 overflow-hidden rounded-lg border transition-shadow",
              onNavy
                ? "border-on-navy/15 bg-on-navy/5"
                : "border-border bg-card shadow-card hover:shadow-lift",
            )}
          >
            {f.image ? (
              <div className="aspect-[31/21] overflow-hidden border-b border-border bg-surface-2">
                <img
                  src={f.image}
                  alt={f.imageAlt ?? ""}
                  loading="lazy"
                  width={992}
                  height={672}
                  className="h-full w-full object-cover transition-transform duration-500 motion-safe:hover:scale-[1.025]"
                />
              </div>
            ) : null}
            <div className="p-6">
            {Icon ? (
              <span
                className={cn(
                  "mb-4 grid h-10 w-10 place-items-center rounded-md",
                  onNavy ? "bg-teal/25 text-teal-soft" : "bg-accent text-navy",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            ) : null}
            <h3
              className={cn(
                "text-base font-semibold sm:text-lg",
                onNavy ? "text-on-navy" : "text-navy",
              )}
            >
              {f.title}
            </h3>
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed",
                onNavy ? "text-on-navy-muted" : "text-muted-foreground",
              )}
            >
              {f.description}
            </p>
            {f.points?.length ? (
              <ul className="mt-4 space-y-1.5">
                {f.points.map((p) => (
                  <li
                    key={p}
                    className={cn(
                      "flex gap-2 text-sm",
                      onNavy ? "text-on-navy-muted" : "text-muted-foreground",
                    )}
                  >
                    <span aria-hidden="true" className={onNavy ? "text-teal-soft" : "text-teal"}>
                      —
                    </span>
                    <span className="min-w-0">{p}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
