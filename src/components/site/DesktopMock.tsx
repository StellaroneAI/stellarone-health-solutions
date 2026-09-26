import { CalendarCheck, Globe, LayoutDashboard, MessageSquare, Mic, Video } from "lucide-react";

/**
 * Illustrative desktop/tablet product visual for EasyMed. Pairs with DeviceMock
 * for a dual-device showcase. Contains no patient data or real clinical content.
 */
export function DesktopMock() {
  return (
    <div className="min-w-0" aria-hidden="true">
      <div className="overflow-hidden rounded-xl border border-on-navy/20 bg-navy p-2.5 shadow-lift">
        <div className="overflow-hidden rounded-lg bg-background">
          {/* App bar */}
          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-3.5 w-3.5 text-teal" />
              <span className="text-xs font-semibold text-navy">EasyMed Care Portal</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="h-2 w-2 rounded-full bg-mint" />
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-[1fr_1.4fr]">
            {/* Side panel */}
            <div className="space-y-2">
              {[
                { icon: Video, label: "Telehealth session" },
                { icon: CalendarCheck, label: "Appointments" },
                { icon: MessageSquare, label: "Patient messages" },
                { icon: Mic, label: "Voice interaction" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-2"
                >
                  <item.icon className="h-3.5 w-3.5 shrink-0 text-teal" />
                  <span className="truncate text-[11px] font-medium text-navy">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Main panel */}
            <div className="space-y-3">
              <div className="rounded-md bg-navy p-3 text-on-navy">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  <span className="text-xs font-semibold">Telehealth consultation</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="rounded bg-on-navy/10 py-4" />
                  <div className="rounded bg-on-navy/10 py-4" />
                </div>
              </div>
              <div className="rounded-md border border-border bg-surface p-3">
                <div className="h-1.5 w-2/3 rounded-full bg-accent" />
                <div className="mt-2 h-1.5 w-1/2 rounded-full bg-accent" />
                <div className="mt-2 h-1.5 w-3/4 rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-on-navy-muted">
        Illustrative interface. Not actual patient data.
      </p>
    </div>
  );
}
