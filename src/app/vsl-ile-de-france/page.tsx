import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAButtons from "@/components/CTAButtons";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata = pageSeo.localVslIleDeFrance;

export default function VslIleDeFrancePage() {
  const localPage = siteConfig.zones.localPagesExamples.find(
    (page) => page.path === "/vsl-ile-de-france"
  );

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title={
          localPage?.title ??
          "VSL en Île-de-France – Véhicules Sanitaires Légers"
        }
        eyebrow="Page locale – Île-de-France"
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
            Cette page locale est orientée sur les recherches de type « VSL
            Île-de-France » pour des transports assis sur prescription médicale
            de transport. Elle doit être adaptée avec les pratiques réelles de
            la société (types de rendez-vous, destinations de soins, habitudes
            de prise en charge). 
          </p>
          <div className="pt-3">
            <CTAButtons layout="inline" />
          </div>
        </div>
      </Section>
    </div>
  );
}