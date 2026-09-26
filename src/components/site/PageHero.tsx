import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "./primitives";

export type HeroCta = { label: string; to: string };

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-on-navy">
      <div className="absolute inset-0 surface-grid opacity-60" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow onNavy>{eyebrow}</Eyebrow>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] text-on-navy sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-on-navy-muted sm:text-lg">
              {description}
            </p>
            {primaryCta || secondaryCta ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryCta ? (
                  <Button asChild variant="onNavy" size="xl" className="w-full sm:w-auto">
                    <Link to={primaryCta.to}>{primaryCta.label}</Link>
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button asChild variant="outlineOnNavy" size="xl" className="w-full sm:w-auto">
                    <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
          {aside ? <div className="min-w-0">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
