import type { Metadata } from "next";
import Section from "@/components/Section";
import MapEmbed from "@/components/MapEmbed";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata = pageSeo.zones;

export default function ZonesPage() {
  const mapUrl = siteConfig.contact.address.mapUrl;

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title="Zones desservies"
        eyebrow="Secteur d'intervention"
        background="subtle"
      >
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] md:items-start">
          <div className="space-y-3 text-sm text-slate-800">
            <p>
              La société d&apos;ambulances intervient principalement sur{" "}
              <strong>{siteConfig.zones.mainCity}</strong> et les communes
              voisines listées ci-dessous. Elle peut également, selon les
              besoins et les disponibilités, organiser des transports vers
              l&apos;Île-de-France (Paris et départements limitrophes). Cette
              liste est fournie à titre d&apos;exemple et doit être complétée
              avec les zones exactes d&apos;intervention.
            </p>
            <ul className="mt-2 grid gap-1 text-sm text-slate-800 sm:grid-cols-2">
              {siteConfig.zones.items.map((zone) => (
                <li key={zone.slug}>• {zone.label}</li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-slate-600">
              Pour certains trajets plus éloignés (consultations spécialisées,
              séjours en centre de soins, etc.), une étude de faisabilité peut
              être réalisée au cas par cas en fonction des disponibilités et
              des contraintes horaires.
            </p>
          </div>
          <div className="space-y-3">
            {mapUrl && (
              <MapEmbed
                mapUrl={mapUrl}
                title={`Plan d'accès à la base d'ambulances`}
              />
            )}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-[13px] text-slate-800">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Pages locales SEO (exemples)
              </h2>
              <ul className="mt-2 space-y-1.5">
                {siteConfig.zones.localPagesExamples.map((page) => (
                  <li key={page.path}>
                    <a
                      href={page.path}
                      className="underline-offset-2 hover:underline"
                    >
                      {page.title}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] text-slate-600">
                Ces pages locales sont des modèles permettant de décliner le
                site sur différentes communes (ambulance + nom de ville, VSL +
                nom de ville, etc.). Les contenus devront être adaptés pour
                chaque ville réellement desservie.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}