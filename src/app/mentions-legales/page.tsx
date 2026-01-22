import type { Metadata } from "next";
import Section from "@/components/Section";
import { siteConfig } from "@data/site-config";
import { pageSeo } from "@/lib/page-seo";

export const metadata: Metadata = pageSeo.mentionsLegales;

export default function MentionsLegalesPage() {
  const legal = siteConfig.business;

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title="Mentions légales"
        eyebrow="Informations réglementaires"
        background="subtle"
      >
        <div className="space-y-6 text-sm text-slate-800">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Éditeur du site
              </h2>
              <p>
                <span className="font-semibold">{legal.legalName}</span>
                {legal.siret && (
                  <>
                    <br />
                    SIRET : {legal.siret}
                  </>
                )}
              </p>
              <p className="mt-1 text-[11px] text-slate-600">
                Les informations ci-dessus sont fournies à titre de
                placeholder. Elles doivent être complétées et vérifiées avec les
                données exactes de la société d&apos;ambulances avant la mise en
                production.
              </p>
            </div>
            <div className="space-y-1">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Coordonnées
              </h2>
              <p>
                {siteConfig.contact.address.line1}
                <br />
                {siteConfig.contact.address.postalCode}{" "}
                {siteConfig.contact.address.city}
                <br />
                {siteConfig.contact.address.country}
              </p>
              {siteConfig.contact.phoneMain && (
                <p className="mt-1">
                  Tél :{" "}
                  <a
                    href={`tel:${siteConfig.contact.phoneMain.replace(
                      /\s+/g,
                      ""
                    )}`}
                    className="underline-offset-2 hover:underline"
                  >
                    {siteConfig.contact.phoneMain}
                  </a>
                </p>
              )}
              {siteConfig.contact.email && (
                <p>
                  E-mail :{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="underline-offset-2 hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Informations juridiques
              </h2>
              <p className="text-sm text-slate-800">
                {legal.legalMentions ||
                  "TODO – Capital social, immatriculation au registre compétent (RCS, registre des entreprises, etc.) et coordonnées du responsable de la publication. Ces informations devront être complétées et validées avant la mise en production."}
              </p>
            </div>
            <div className="space-y-1">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Hébergement
              </h2>
              <p className="text-sm text-slate-800">
                Ce site est présenté en environnement de démonstration. L&apos;hébergeur
                définitif (par exemple : Vercel, OVH, Scaleway…) sera choisi et
                validé avec le client lors de la mise en production. Les
                coordonnées complètes de l&apos;hébergeur seront alors ajoutées
                dans cette rubrique.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Propriété intellectuelle
            </h2>
            <p>
              La structure générale du site, les textes, éléments graphiques et
              visuels ont pour objectif de présenter un exemple de site vitrine
              pour une société d&apos;ambulances et de transport sanitaire. Les
              contenus définitifs (photos, textes, logos) devront être fournis
              ou validés par le client avant la mise en ligne officielle.
            </p>
            <p>
              Toute reproduction non autorisée du design ou des contenus
              définitifs pourra faire l&apos;objet de poursuites conformément
              aux dispositions en vigueur relatives à la propriété
              intellectuelle.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}