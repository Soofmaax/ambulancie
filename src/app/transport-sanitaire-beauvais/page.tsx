import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAButtons from "@/components/CTAButtons";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata =
  pageSeo.localTransportSanitaireBeauvais;

export default function TransportSanitaireBeauvaisPage() {
  const localPage = siteConfig.zones.localPagesExamples.find(
    (page) => page.path === "/transport-sanitaire-beauvais"
  );

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title={
          localPage?.title ??
          "Transport sanitaire à Beauvais (Oise 60) – Ambulance, VSL & transport assis"
        }
        eyebrow="Page locale – secteur de Beauvais"
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
            Cette page locale illustre une structuration SEO autour de la
            requête « transport sanitaire Beauvais ». Les contenus doivent être
            ajustés avec les types de trajets les plus fréquents, les horaires
            et les établissements de soins habituellement desservis.
          </p>
          <div className="pt-3">
            <CTAButtons layout="inline" />
          </div>
        </div>
      </Section>
    </div>
  );
}