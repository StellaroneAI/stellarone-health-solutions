import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Container } from "./primitives";

export function CtaBand({
  title = "Let's discuss your revenue cycle and automation goals",
  description = "Tell us about your organization and current setup. We'll follow up with a practical, scoped conversation — no obligation.",
  primaryLabel = "Discuss Your RCM Needs",
  secondaryLabel = "Talk to Our Healthcare Team",
  tone = "navy",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  tone?: "navy" | "light";
}) {
  const onNavy = tone === "navy";
  return (
    <section className={onNavy ? "bg-navy text-on-navy" : "bg-surface text-foreground"}>
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2
              className={`text-2xl font-bold leading-tight sm:text-3xl ${onNavy ? "text-on-navy" : "text-navy"}`}
            >
              {title}
            </h2>
            <p
              className={`mt-3 text-base leading-relaxed ${onNavy ? "text-on-navy-muted" : "text-muted-foreground"}`}
            >
              {description}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0">
            <Button asChild variant={onNavy ? "onNavy" : "brand"} size="xl" className="w-full sm:w-auto">
              <Link to="/contact">{primaryLabel}</Link>
            </Button>
            <Button
              asChild
              variant={onNavy ? "outlineOnNavy" : "outlineBrand"}
              size="xl"
              className="w-full sm:w-auto"
            >
              <Link to="/contact">{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
