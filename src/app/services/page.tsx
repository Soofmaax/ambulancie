import type { Metadata } from "next";
import Section from "@/components/Section";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata = pageSeo.services;

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title="Services de transport sanitaire"
        eyebrow="Ambulances & véhicules sanitaires"
        background="subtle"
      >
        <div className="space-y-6 text-sm text-slate-800">
          <p>
            Cette page présente les principaux types de transports sanitaires
            qui peuvent être assurés par une société d&apos;ambulances. Les
            contenus sont rédigés de manière générique et doivent être adaptés
            en fonction des autorisations et de l&apos;offre réelle de
            l&apos;entreprise (ambulance, VSL, transport assis, etc.).
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {siteConfig.services.mainTypes.map((service) => (
              <article
                key={service.id}
                className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4"
              >
                <h2 className="text-sm font-semibold text-slate-900">
                  {service.label}
                </h2>
                <p>{service.description}</p>
                <ul className="mt-2 space-y-1 text-[13px] text-slate-700">
                  {service.bulletPoints.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section
        title="Missions et motifs de transport"
        eyebrow="Consultations, dialyse, transferts…"
        background="subtle"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.services.medicalMissions.map((mission) => (
            <article
              key={mission.id}
              className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-800"
            >
              <h2 className="text-sm font-semibold text-slate-900">
                {mission.label}
              </h2>
              <ul className="mt-1 space-y-1 text-[13px] text-slate-700">
                {mission.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-slate-600">
          Les exemples ci-dessus sont à adapter aux pratiques réelles de la
          société d&apos;ambulances (types de trajets assurés, distances
          habituelles, partenariats éventuels avec des établissements de soins,
          etc.).
        </p>
      </Section>
    </div>
  );
}