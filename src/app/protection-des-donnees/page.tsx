import type { Metadata } from "next";
import Section from "@/components/Section";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";

export const metadata: Metadata = pageSeo.protectionDonnees;

export default function ProtectionDesDonneesPage() {
  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title="Protection des données personnelles"
        eyebrow="Informations relatives au RGPD"
        background="subtle"
      >
        <div className="space-y-4 text-sm text-slate-800">
          <p>
            Les formulaires présents sur ce site ont pour seule finalité
            l&apos;organisation de transports sanitaires non urgents et le
            traitement des demandes de contact. Les données collectées sont
            limitées à ce qui est strictement nécessaire au traitement de ces
            demandes (identité, coordonnées, éléments pratiques liés au
            transport).
          </p>

          <h2 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Responsable du traitement
          </h2>
          <p>
            Le responsable du traitement des données collectées via ce site est
            l&apos;éditeur du site, tel qu&apos;indiqué dans les mentions
            légales : <strong>{siteConfig.business.legalName}</strong>, situé à{" "}
            {siteConfig.contact.address.line1},{" "}
            {siteConfig.contact.address.postalCode}{" "}
            {siteConfig.contact.address.city}.
          </p>

          <h2 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Finalités des traitements
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Répondre aux demandes de transport sanitaire non urgent transmises
              via le formulaire dédié.
            </li>
            <li>
              Répondre aux demandes d&apos;information ou de contact déposées
              via le formulaire de contact.
            </li>
            <li>
              Le cas échéant, assurer le suivi administratif lié à ces demandes
              (organisation du trajet, échanges avec l&apos;usager, etc.).
            </li>
          </ul>

          <h2 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Base légale
          </h2>
          <p>
            La collecte des données via les formulaires repose sur le{" "}
            <strong>consentement</strong> de la personne concernée, matérialisé
            par la case à cocher obligatoire présente sous chaque formulaire.
          </p>

          <h2 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Destinataires des données
          </h2>
          <p>
            Les informations transmises via les formulaires sont destinées aux
            équipes en charge de l&apos;organisation des transports sanitaires
            et de la gestion des demandes de contact. Elles ne sont pas cédées à
            des tiers à des fins commerciales.
          </p>

          <h2 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Durée de conservation
          </h2>
          <p>
            Les données collectées via les formulaires sont conservées pendant
            une durée limitée, strictement nécessaire au traitement de la
            demande et, le cas échéant, à la constitution d&apos;un historique
            interne lié à la prise en charge. Cette durée devra être précisée et
            validée avec le client avant mise en production.
          </p>

          <h2 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Vos droits
          </h2>
          <p>
            Conformément à la réglementation applicable en matière de
            protection des données, vous disposez d&apos;un droit d&apos;accès,
            de rectification, d&apos;effacement, de limitation du traitement, de
            portabilité et d&apos;opposition aux données vous concernant. Vous
            pouvez également retirer votre consentement à tout moment pour les
            traitements fondés sur celui-ci.
          </p>
          <p>
            Pour exercer ces droits, vous pouvez contacter l&apos;éditeur du
            site à l&apos;adresse suivante :{" "}
            {siteConfig.contact.email
              ? siteConfig.contact.email
              : "TODO – Adresse e-mail de contact pour l'exercice des droits"}
            .
          </p>

          <h2 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Sécurité des données
          </h2>
          <p>
            Des mesures techniques et organisationnelles raisonnables sont mises
            en œuvre pour protéger les données collectées via ce site contre
            l&apos;accès non autorisé, la perte ou l&apos;altération. Ces mesures
            devront être précisées et adaptées en fonction de l&apos;hébergement
            et des outils effectivement utilisés en production.
          </p>

          <p className="mt-4 text-[11px] text-slate-600">
            Cette page est fournie comme base de travail et doit être relue,
            complétée et validée avec le client et, si nécessaire, avec un
            conseil juridique avant la mise en ligne définitive du site.
          </p>
        </div>
      </Section>
    </div>
  );
}