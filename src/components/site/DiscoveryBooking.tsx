import { useState } from "react";
import { CalendarDays, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DISCOVERY_BOOKING_URL } from "@/content/site";

export function DiscoveryBooking() {
  const [open, setOpen] = useState(false);
  return <div className="border-b border-border pb-6">
    <CalendarDays aria-hidden="true" className="h-6 w-6 text-teal" />
    <h3 className="mt-3 text-xl font-semibold text-navy">Prefer a discovery call?</h3>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Discuss your priorities directly with our healthcare team.</p>
    {DISCOVERY_BOOKING_URL ? <>
      <Button variant="brand" onClick={() => setOpen(true)} className="mt-4 h-auto whitespace-normal py-3"><CalendarDays aria-hidden="true" /> Book a 15-minute discovery call</Button>
      <Dialog open={open} onOpenChange={setOpen}><DialogContent className="flex h-[85dvh] max-w-3xl flex-col"><DialogTitle>Book a discovery call</DialogTitle><DialogDescription>Availability and booking are provided by our scheduling service. Do not include patient information.</DialogDescription><iframe title="StellarOne discovery call scheduling" src={DISCOVERY_BOOKING_URL} className="min-h-0 w-full flex-1 rounded-md border border-border" /><Button asChild variant="link" className="shrink-0"><a href={DISCOVERY_BOOKING_URL} target="_blank" rel="noopener noreferrer">Open booking page <ExternalLink aria-hidden="true" /></a></Button></DialogContent></Dialog>
    </> : <Button asChild variant="outlineBrand" className="mt-4 h-auto whitespace-normal py-3"><a href="mailto:Praveen.Jayaraman@stellaronehealth.com?subject=Discovery%20call%20request"><Mail aria-hidden="true" /> Request a discovery call</a></Button>}
  </div>;
}