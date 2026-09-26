import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "./primitives";
import { cn } from "@/lib/utils";

export const PRIMARY_NAV = [
  { label: "RCM", to: "/rcm" },
  { label: "RCM Services", to: "/rcm-services" },
  { label: "Agentic AI", to: "/agentic-ai" },
  { label: "Healthcare AI", to: "/healthcare-ai" },
  { label: "EasyMed", to: "/easymed" },
  { label: "Industries", to: "/industries" },
  { label: "Why StellarOne", to: "/why-stellarone" },
] as const;

export function Logo({ onNavy = false }: { onNavy?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="StellarOne Health home">
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-md",
          onNavy ? "bg-on-navy/10" : "bg-navy",
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            d="M12 3l2.2 5 5.3.5-4 3.6 1.2 5.3L12 14.7 7.3 17.4l1.2-5.3-4-3.6 5.3-.5L12 3z"
            className={onNavy ? "text-teal-soft" : "text-on-navy"}
            stroke="currentColor"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-base font-extrabold tracking-tight",
            onNavy ? "text-on-navy" : "text-navy",
          )}
        >
          StellarOne Health
        </span>
        <span
          className={cn(
            "block text-[11px] tracking-wide",
            onNavy ? "text-on-navy-muted" : "text-muted-foreground",
          )}
        >
          Healthcare Operations &amp; Technology
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-navy"
              activeProps={{ className: "text-navy bg-secondary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild variant="brand" size="lg">
            <Link to="/contact">Talk to StellarOne</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border text-navy xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-background xl:hidden">
          <Container className="py-4">
            <nav aria-label="Mobile" className="flex flex-col">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/85 hover:bg-secondary"
              >
                Home
              </Link>
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground/85 hover:bg-secondary"
                  activeProps={{ className: "text-navy bg-secondary" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button asChild variant="brand" size="xl" className="mt-4 w-full">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Talk to StellarOne
              </Link>
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
