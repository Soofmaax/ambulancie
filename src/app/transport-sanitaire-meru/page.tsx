import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAButtons from "@/components/CTAButtons";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata =
  pageSeo.localTransportSanitaireMeru;

export default function TransportSanitaireMeruPage() {
  const localPage = siteConfig.zones.localPagesExamples.find(
    (page) => page.path === "/transport-sanitaire-meru"
  );

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title={
          localPage?.title ??
          "Transport sanitaire à Méru (Oise 60) – Ambulance, VSL & transport assis"
        }
        eyebrow="Page locale – secteur de Méru"
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
            requête « transport sanitaire Méru ». Elle doit être ajustée avec
            les informations réelles sur les zones desservies, les types de
            trajets fréquemment assurés et les relations avec les
            établissements de santé de la région.
          </p>
          <div className="pt-3">
            <CTAButtons layout="inline" />
          </div>
        </div>
      </Section>
    </div>
  );
}