import type { Metadata } from "next";
import Section from "@/components/Section";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata = pageSeo.priseEnCharge;

export default function PriseEnChargePage() {
  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title="Prise en charge & organisation du transport"
        eyebrow="Étapes d'un transport sanitaire non urgent"
        background="subtle"
      >
        <div className="space-y-6 text-sm text-slate-800">
          <p>
            La prise en charge d&apos;un transport sanitaire non urgent repose
            sur quelques étapes clés : prise de contact, vérification de la
            prescription, choix du véhicule adapté et organisation du trajet.
            Les éléments ci-dessous constituent une base de travail à adapter
            selon les procédures internes de la société.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {siteConfig.process.steps.map((step) => (
              <article
                key={step.id}
                className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4"
              >
                <h2 className="text-sm font-semibold text-slate-900">
                  {step.title}
                </h2>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section
        title="Documents à prévoir"
        eyebrow="Prescription & justificatifs"
        background="subtle"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] md:items-start">
          <div className="space-y-3 text-sm text-slate-800">
            <p>
              Afin de faciliter l&apos;organisation du transport et, le cas
              échéant, la prise en charge financière, certains documents sont
              généralement nécessaires. La liste ci-dessous est donnée à titre
              indicatif et doit être confirmée en fonction de la réglementation
              et des usages de l&apos;entreprise.
            </p>
            <ul className="mt-2 space-y-1">
              {siteConfig.process.documents.map((doc) => (
                <li key={doc.id}>
                  <strong>{doc.label}</strong>
                  {doc.description && <> – {doc.description}</>}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-800">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Conventionnement & tiers payant
            </h2>
            <p>
              {siteConfig.process.billing.conventionLabel ||
                "Les informations relatives au conventionnement avec l'Assurance Maladie et aux modalités de tiers payant doivent être précisées ici, en accord avec la situation réelle de la société d'ambulances."}
            </p>
            <p className="text-[13px] text-slate-700">
              {siteConfig.process.billing.transparencyNote}
            </p>
            <p className="text-[11px] text-slate-600">
              Les détails (assurances, conventions, devis) devront être adaptés
              en concertation avec le client et, si nécessaire, avec sa gestion
              comptable ou juridique.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}