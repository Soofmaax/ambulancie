import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAButtons from "@/components/CTAButtons";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata = pageSeo.localVslParis17;

export default function VslParis17Page() {
  const localPage = siteConfig.zones.localPagesExamples.find(
    (page) => page.path === "/vsl-paris-17"
  );

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title={
          localPage?.title ??
          "VSL Paris 17 – Véhicules Sanitaires Légers pour vos rendez-vous médicaux"
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
            Cette page locale cible les recherches de type « VSL Paris 17 »
            pour des transports assis sur prescription médicale de transport.
            Elle pourra être complétée avec les types de rendez-vous les plus
            fréquents et les établissements de soins parisiens habituellement
            desservis dans le 17e arrondissement.
          </p>
          <div className="pt-3">
            <CTAButtons layout="inline" />
          </div>
        </div>
      </Section>
    </div>
  );
}