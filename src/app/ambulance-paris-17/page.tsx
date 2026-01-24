import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAButtons from "@/components/CTAButtons";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata = pageSeo.localAmbulanceParis17;

export default function AmbulanceParis17Page() {
  const localPage = siteConfig.zones.localPagesExamples.find(
    (page) => page.path === "/ambulance-paris-17"
  );

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title={
          localPage?.title ??
          "Ambulances Paris 17 – Transport sanitaire non urgent dans le 17e arrondissement"
        }
        eyebrow="Page locale – Paris 17"
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
            Cette page locale vise les recherches de type « ambulance Paris 17
            » pour des transports sanitaires non urgents, réalisés sur
            prescription médicale de transport. Elle doit être complétée avec
            les trajets les plus fréquents, les quartiers concernés et les
            établissements de soins parisiens desservis.
          </p>
          <div className="pt-3">
            <CTAButtons layout="inline" />
          </div>
        </div>
      </Section>
    </div>
  );
}