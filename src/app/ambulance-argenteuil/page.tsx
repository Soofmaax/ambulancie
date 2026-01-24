import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAButtons from "@/components/CTAButtons";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata = pageSeo.localAmbulanceArgenteuil;

export default function AmbulanceArgenteuilPage() {
  const localPage = siteConfig.zones.localPagesExamples.find(
    (page) => page.path === "/ambulance-argenteuil"
  );

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title={
          localPage?.title ??
          "Ambulances à Argenteuil (Île-de-France) – Transport sanitaire non urgent"
        }
        eyebrow="Page locale – secteur d'Argenteuil"
        background="subtle"
      >
        <div className="space-y-4 text-sm text-slate-800">
          <p>{localPage?.intro}</p>
          <ul className="space-y-1 text-sm">
            {localPage?.specificPoints.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-slate-600">
            Cette page locale cible les recherches de type « ambulance
            Argenteuil » pour des transports sanitaires non urgents, réalisés
            sur prescription médicale de transport. Les contenus devront être
            complétés en fonction des trajets réellement assurés et des
            établissements de soins les plus fréquemment desservis.
          </p>
          <div className="pt-3">
            <CTAButtons layout="inline" />
          </div>
        </div>
      </Section>
    </div>
  );
}