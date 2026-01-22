import CTAButtons from "./CTAButtons";
import { siteConfig } from "@data/site-config";

export default function Hero() {
  const firstOpeningRange = siteConfig.openingHours[0];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-slate-50 px-4 py-8 shadow-sm sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(37,99,235,0.12),_transparent_55%)]" />
      <div className="relative grid gap-10 md:grid-cols-[minmax(0,1.05fr),minmax(0,0.95fr)] md:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-sky-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.35)]" />
            <span>
              Transport sanitaire non urgent · {siteConfig.zones.mainCity}
            </span>
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Ambulances &amp; transport sanitaire à{" "}
            <span className="text-sky-800">{siteConfig.zones.mainCity}</span>
          </h1>
          <p className="max-w-xl text-pretty text-sm text-slate-800 sm:text-base">
            Organisation de transports sanitaires programmés en ambulance, VSL
            et transport assis, pour vos consultations, hospitalisations,
            séances de dialyse ou de rééducation. Un service pensé pour être
            clair, disponible et rassurant, sans surpromesse.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTAButtons context="hero" />
          </div>
          <div className="mt-3 grid gap-3 text-xs text-slate-700 sm:grid-cols-3">
            <div className="space-y-1">
              <p className="font-semibold text-slate-900">Standard</p>
              <p>
                {siteConfig.contact.phoneMain}
                {siteConfig.contact.phoneSecondary && (
                  <>
                    <br />
                    {siteConfig.contact.phoneSecondary}
                  </>
                )}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-slate-900">Adresse</p>
              <p>
                {siteConfig.contact.address.line1}
                <br />
                {siteConfig.contact.address.postalCode}{" "}
                {siteConfig.contact.address.city}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-slate-900">Horaires indicatifs</p>
              {firstOpeningRange && (
                <p>
                  <span className="block font-medium">
                    {firstOpeningRange.days}
                  </span>
                  {firstOpeningRange.slots.map((slot) => (
                    <span
                      key={`${slot.from}-${slot.to}`}
                      className="block text-slate-700"
                    >
                      {slot.from} – {slot.to}
                      {slot.label && ` · ${slot.label}`}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 rounded-[3rem] bg-sky-100 blur-3xl" />
          <div className="relative flex h-full items-center justify-center rounded-[2.25rem] border border-sky-100 bg-white/80 p-6 shadow-xl shadow-sky-900/10">
            <div className="space-y-3 text-sm text-slate-800">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Transport sanitaire non urgent
              </p>
              <ul className="space-y-1.5 text-sm">
                <li>• Ambulance (transport allongé ou surveillé)</li>
                <li>• VSL (Véhicule Sanitaire Léger)</li>
                <li>• Transport assis professionnalisé</li>
              </ul>
              <p className="mt-3 text-xs text-slate-700">
                Les modalités de prise en charge dépendent de la prescription
                médicale de transport et des critères de l&apos;Assurance
                Maladie. En cas d&apos;urgence vitale, contactez le 15 (SAMU) ou
                le 112.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}