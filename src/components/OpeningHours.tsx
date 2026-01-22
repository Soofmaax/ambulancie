import type { OpeningHourRange } from "@data/site-config";

interface OpeningHoursProps {
  ranges: OpeningHourRange[];
}

export default function OpeningHours({ ranges }: OpeningHoursProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm sm:p-6">
      <h3 className="text-sm font-semibold text-slate-900">
        Horaires indicatifs du standard
      </h3>
      <div className="mt-3 space-y-3">
        {ranges.map((range) => (
          <div
            key={range.days}
            className="flex items-baseline justify-between gap-4"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-700">
              {range.days}
            </p>
            <div className="text-right text-xs text-slate-800">
              {range.slots.map((slot) => (
                <div key={`${range.days}-${slot.from}-${slot.to}`}>
                  <span>
                    {slot.from} – {slot.to}
                  </span>
                  {slot.label && (
                    <span className="ml-1 text-slate-500">({slot.label})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-slate-600">
        Ces horaires sont fournis à titre indicatif et doivent être adaptés
        selon l&apos;organisation réelle de la société d&apos;ambulances. En cas
        de doute, privilégiez un appel téléphonique au standard.
      </p>
    </div>
  );
}