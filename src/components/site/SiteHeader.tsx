import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "./primitives";
import { cn } from "@/lib/utils";
import stellarOneLogo from "@/assets/stellarone-health-logo.png";

export const PRIMARY_NAV = [
  { label: "RCM", to: "/rcm", tag: undefined as string | undefined },
  { label: "RCM Services", to: "/rcm-services", tag: "10" },
  { label: "Agentic AI", to: "/agentic-ai", tag: "AI" },
  { label: "Healthcare AI", to: "/healthcare-ai", tag: undefined as string | undefined },
  { label: "EasyMed", to: "/easymed", tag: "Platform" },
  { label: "Industries", to: "/industries", tag: undefined as string | undefined },
  { label: "Why StellarOne", to: "/why-stellarone", tag: undefined as string | undefined },
] as const;


export function Logo({ onNavy = false }: { onNavy?: boolean }) {
  return (
    <Link
      to="/"
      className={cn(
        "flex shrink-0 items-center gap-2.5 rounded-sm",
        onNavy && "bg-on-navy px-2 py-1.5",
      )}
      aria-label="StellarOne Health home"
    >
      <img
        src={stellarOneLogo}
        alt=""
        width={992}
        height={624}
        className="h-11 w-auto sm:h-12"
      />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display text-base font-bold tracking-tight sm:text-lg",
            onNavy ? "text-navy" : "text-navy",
          )}
        >
          StellarOne Health
        </span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-wide sm:text-[11px]",
            onNavy ? "text-navy/70" : "text-muted-foreground",
          )}
        >
          Healthcare Operations & Technology
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

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-xl border border-border/70 bg-secondary/50 p-1 backdrop-blur-sm xl:flex"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-foreground/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-background hover:text-navy hover:shadow-sm"
              activeProps={{
                className:
                  "border-border bg-background text-navy shadow-sm font-semibold",
              }}
            >
              {item.label}
              {item.tag ? (
                <span className="rounded-full bg-teal-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none tracking-wide text-navy">
                  {item.tag}
                </span>

              ) : null}
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
