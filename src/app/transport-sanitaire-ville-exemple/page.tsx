import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAButtons from "@/components/CTAButtons";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata = pageSeo.localTransportSanitaireVilleExemple;

export default function TransportSanitaireVilleExemplePage() {
  const localPage = siteConfig.zones.localPagesExamples.find(
    (page) => page.path === "/transport-sanitaire-ville-exemple"
  );

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title={
          localPage?.title ??
          "Transport sanitaire à Ville exemple – Ambulance, VSL & transport assis"
        }
        eyebrow="Page locale de démonstration"
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
            Cette page locale est un exemple de structuration SEO autour de la
            requête « transport sanitaire + nom de ville ». Elle doit être
            ajustée avec les informations réelles de la zone d&apos;activité et
            des relations avec les établissements de santé.
          </p>
          <div className="pt-3">
            <CTAButtons layout="inline" />
          </div>
        </div>
      </Section>
    </div>
  );
}