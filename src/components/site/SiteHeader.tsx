import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "./primitives";
import { cn } from "@/lib/utils";

const GROUPS = [
  { label: "Solutions", links: [{ label: "Revenue Cycle Management", to: "/rcm" }, { label: "RCM Services", to: "/rcm-services" }, { label: "Healthcare Automation", to: "/healthcare-automation" }, { label: "Agentic AI", to: "/agentic-ai" }, { label: "Healthcare AI", to: "/healthcare-ai" }] },
  { label: "Products", links: [{ label: "EasyMed", to: "/easymed" }] },
] as const;

const DIRECT = [{ label: "Industries", to: "/industries" }, { label: "About", to: "/about" }, { label: "Insights", to: "/insights" }, { label: "Contact", to: "/contact" }] as const;

export function Logo({ onNavy = false }: { onNavy?: boolean }) {
  return <Link to="/" className={cn("flex min-w-0 items-center gap-2 rounded-sm", onNavy && "bg-on-navy px-2 py-1.5")} aria-label="StellarOne Health home">
    <img src="/favicon.png" alt="" width={64} height={64} className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
    <span className="flex min-w-0 flex-col leading-tight"><span className="font-display text-base font-bold text-navy sm:text-lg">StellarOne Health</span><span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-[11px]">Healthcare Operations &amp; Technology</span></span>
  </Link>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
    <Container className="flex h-16 items-center justify-between gap-2 sm:gap-4 lg:h-20">
      <Logo />
      <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
        <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-navy" activeProps={{ className: "bg-secondary text-navy" }}>Home</Link>
        {GROUPS.map((group) => <div key={group.label} className="group relative">
          <button type="button" className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-navy" aria-haspopup="true">{group.label}<ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /></button>
          <div className="invisible absolute left-0 top-full w-64 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
            <div className="rounded-lg border border-border bg-background p-2 shadow-lift">{group.links.map((item) => <Link key={item.to} to={item.to} className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-navy" activeProps={{ className: "bg-secondary text-navy" }}>{item.label}</Link>)}</div>
          </div>
        </div>)}
        {DIRECT.map((item) => <Link key={item.to} to={item.to} className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-navy" activeProps={{ className: "bg-secondary text-navy" }}>{item.label}</Link>)}
      </nav>
      <Button asChild variant="brand" size="lg" className="hidden xl:inline-flex"><Link to="/contact">Request an RCM Assessment</Link></Button>
      <Button type="button" variant="outlineBrand" size="icon" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)} className="shrink-0 lg:hidden">{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</Button>
    </Container>
    {open ? <div id="mobile-nav" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden"><Container className="py-4"><nav aria-label="Mobile" className="grid gap-1"><Link to="/" onClick={() => setOpen(false)} className="rounded-md px-4 py-3 font-medium text-navy">Home</Link>{GROUPS.map((group) => <div key={group.label} className="border-t border-border pt-2"><p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-teal">{group.label}</p>{group.links.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="block rounded-md px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary">{item.label}</Link>)}</div>)}<div className="border-t border-border pt-2">{DIRECT.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="block rounded-md px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary">{item.label}</Link>)}</div></nav><Button asChild variant="brand" size="xl" className="mt-4 w-full"><Link to="/contact" onClick={() => setOpen(false)}>Request an RCM Assessment</Link></Button></Container></div> : null}
  </header>;
}