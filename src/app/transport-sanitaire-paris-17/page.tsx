import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAButtons from "@/components/CTAButtons";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata =
  pageSeo.localTransportSanitaireParis17;

export default function TransportSanitaireParis17Page() {
  const localPage = siteConfig.zones.localPagesExamples.find(
    (page) => page.path === "/transport-sanitaire-paris-17"
  );

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title={
          localPage?.title ??
          "Transport sanitaire Paris 17 – Ambulance, VSL & transport assis"
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
            Cette page locale illustre une structuration SEO autour de la
            requête « transport sanitaire Paris 17 ». Les contenus doivent être
            ajustés avec les habitudes réelles de prise en charge dans le 17e
            arrondissement (quartiers desservis, types de trajets, destinations
            hospitalières, etc.).
          </p>
          <div className="pt-3">
            <CTAButtons layout="inline" />
          </div>
        </div>
      </Section>
    </div>
  );
}