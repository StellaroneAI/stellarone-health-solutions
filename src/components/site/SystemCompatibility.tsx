import { MonitorCheck } from "lucide-react";
import { VERIFIED_SYSTEMS } from "@/content/site";
import { Section, SectionHeading } from "./primitives";

export function SystemCompatibility() {
  if (VERIFIED_SYSTEMS.length === 0) return null;
  return <Section><SectionHeading eyebrow="System experience" title="Support in the systems your team uses" description="Operational support is scoped to your configuration, access permissions and workflows." /><ul className="mt-7 flex flex-wrap gap-3">{VERIFIED_SYSTEMS.map((name) => <li key={name} className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-3 text-sm font-semibold text-navy"><MonitorCheck aria-hidden="true" className="h-4 w-4 text-teal" />{name}</li>)}</ul><p className="mt-4 text-xs text-muted-foreground">System names identify operational experience, not vendor partnerships, endorsements or certified integrations. Availability is confirmed during scoping.</p></Section>;
}