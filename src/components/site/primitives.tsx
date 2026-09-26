import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  tone = "light",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "surface" | "navy";
  id?: string;
}) {
  const tones = {
    light: "bg-background text-foreground",
    surface: "bg-surface text-foreground",
    navy: "bg-navy-deep text-on-navy",
  } as const;
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, onNavy = false }: { children: ReactNode; onNavy?: boolean }) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.16em]",
        onNavy ? "text-teal-soft" : "text-teal",
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  onNavy = false,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  onNavy?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow onNavy={onNavy}>{eyebrow}</Eyebrow> : null}
      <Heading
        className={cn(
          "mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]",
          onNavy ? "text-on-navy" : "text-navy",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            onNavy ? "text-on-navy-muted" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "navy";
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-6 transition-shadow",
        tone === "navy"
          ? "border-on-navy/12 bg-on-navy/5 text-on-navy"
          : "border-border bg-card shadow-card hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md border border-border bg-surface-2 p-4 text-xs leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}
