import { CalendarCheck, MessageSquare, Mic, Video } from "lucide-react";

/** Illustrative product visual. Contains no patient data and no real clinical content. */
export function DeviceMock() {
  return (
    <div className="mx-auto w-full max-w-[280px]" aria-hidden="true">
      <div className="rounded-[2rem] border border-on-navy/20 bg-navy p-3 shadow-lift">
        <div className="overflow-hidden rounded-[1.5rem] bg-background">
          <div className="flex items-center justify-between bg-surface px-4 py-3">
            <span className="text-xs font-semibold text-navy">EasyMed</span>
            <span className="h-2 w-2 rounded-full bg-mint" />
          </div>

          <div className="space-y-3 p-4">
            <div className="rounded-lg bg-navy p-3 text-on-navy">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span className="text-xs font-semibold">Video consultation</span>
              </div>
              <p className="mt-2 text-[11px] text-on-navy-muted">Join from your phone</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: CalendarCheck, label: "Appointments" },
                { icon: MessageSquare, label: "Messages" },
                { icon: Mic, label: "Voice" },
                { icon: CalendarCheck, label: "Reminders" },
              ].map((item, i) => (
                <div key={i} className="rounded-md border border-border bg-card p-2.5">
                  <item.icon className="h-4 w-4 text-teal" />
                  <p className="mt-1.5 text-[11px] font-medium text-navy">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-md border border-border bg-surface p-3">
              <div className="h-1.5 w-2/3 rounded-full bg-accent" />
              <div className="mt-2 h-1.5 w-1/2 rounded-full bg-accent" />
              <div className="mt-2 h-1.5 w-3/4 rounded-full bg-accent" />
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
