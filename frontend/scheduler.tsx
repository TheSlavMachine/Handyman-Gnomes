import React, { useMemo, useState } from "react";

type TimePref = "Anytime" | "Prefer Morning" | "Prefer Afternoon" | "Prefer Evening" | "ASAP" | "No preference";

export default function ScheduleRequest() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [timePref, setTimePref] = useState<TimePref | "">("");
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState<"Text" | "Call" | "Email">("Text");

  const days = useMemo(() => {
    const out: { key: string; label: string; dow: string }[] = [];
    const fmt = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
    const dow = new Intl.DateTimeFormat(undefined, { weekday: "short" });
    for (let i = 0; i < 21; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      out.push({
        key: d.toISOString().slice(0, 10),
        label: fmt.format(d), // e.g., "Aug 21"
        dow: dow.format(d),   // e.g., "Thu"
      });
    }
    return out;
  }, []);

  const timePrefs: TimePref[] = ["Anytime","Prefer Morning","Prefer Afternoon","Prefer Evening","ASAP","No preference"];

  const canSubmit = selectedDate && timePref;

  const submit = async () => {
    // TODO: call /api/requests
    // await fetch("/api/requests", { method:"POST", body: JSON.stringify({...}) })
    alert(`Requested: ${selectedDate} • ${timePref}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Schedule date & time</h2>

      {/* Date strip */}
      <section>
        <h3 className="text-sm font-medium mb-2">1. Choose a date</h3>
        <div role="radiogroup" aria-label="Choose a date" className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {days.map((d) => {
            const selected = d.key === selectedDate;
            return (
              <button
                key={d.key}
                role="radio"
                aria-checked={selected}
                onClick={() => setSelectedDate(d.key)}
                className={`min-w-[84px] rounded-xl border px-3 py-2 text-center
                            focus:outline-none focus:ring-2
                            ${selected ? "border-blue-600 ring-blue-200 font-semibold underline" : "border-gray-300"}`}
              >
                <div className="text-xs uppercase tracking-wide">{d.dow}</div>
                <div className="text-base">{d.label}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex gap-2">
          <button className="px-2 py-1 text-sm rounded border" onClick={() => setSelectedDate(days[0].key)}>Today</button>
          <button className="px-2 py-1 text-sm rounded border" onClick={() => setSelectedDate(days[1].key)}>Tomorrow</button>
          <button className="px-2 py-1 text-sm rounded border" onClick={() => setSelectedDate(days.find(Boolean)?.key!)}>Next available</button>
        </div>
      </section>

      {/* Time preference */}
      <section>
        <h3 className="text-sm font-medium mb-2">2. Time preference</h3>
        <div role="radiogroup" aria-label="Time preference" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {timePrefs.map((t) => {
            const selected = t === timePref;
            return (
              <button
                key={t}
                role="radio"
                aria-checked={selected}
                onClick={() => setTimePref(t)}
                className={`rounded-xl border px-3 py-2 text-sm
                           focus:outline-none focus:ring-2
                           ${selected ? "border-blue-600 ring-blue-200 font-semibold underline" : "border-gray-300"}`}
              >
                {t}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Your handyman will email you with an exact arrival time after you submit your request.
        </p>
      </section>

      {/* Notes + contact */}
      <section className="space-y-2">
        <label className="text-sm font-medium">Notes for the handyman</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full min-h-[80px] border rounded-lg p-2"
          placeholder="Gate code, pets, parking details…"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm">Prefer to be contacted by:</span>
          {(["Text","Call","Email"] as const).map((m) => (
            <button key={m}
              onClick={() => setContact(m)}
              className={`text-sm rounded border px-2 py-1 ${contact===m ? "border-blue-600 font-semibold underline" : "border-gray-300"}`}>
              {m}
            </button>
          ))}
        </div>
      </section>

      {/* Help strip */}
      <div className="rounded-md border p-3 text-sm">
        Emergency? Call <a href="tel:14703540033" className="font-medium">(470) 354-0033</a> or
        <button className="ml-1 underline"> request a callback</button>.
      </div>

      {/* Sticky summary */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t p-3 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-600">Selected:</span>{" "}
          <strong>{selectedDate || "—"}</strong> {timePref ? `• ${timePref}` : ""}
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border">Back</button>
          <button
            disabled={!canSubmit}
            onClick={submit}
            className={`px-4 py-2 rounded-lg text-white ${canSubmit ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Request visit
          </button>
        </div>
      </div>
    </div>
  );
}
