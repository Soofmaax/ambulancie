import type { Metadata } from "next";
import Hero from "@/components/Hero";
import OpeningHours from "@/components/OpeningHours";
import CTAButtons from "@/components/CTAButtons";
import Section from "@/components/Section";
import { siteConfig } from "@data/site-config";
import { pageSeo } from "@/lib/page-seo";

export const metadata: Metadata = pageSeo.home;

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col gap-12 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />

      <Section
        id="services"
        title="Services de transport sanitaire"
        eyebrow="Ambulance · VSL · Transport assis"
        background="subtle"
        cta={{
          label: "Découvrir tous les services",
          href: "/services",
        }}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.services.mainTypes.map((service) => (
            <article
              key={service.id}
              className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {service.label}
              </h3>
              <p className="text-sm text-slate-800">{service.description}</p>
              <ul className="mt-2 space-y-1 text-[13px] text-slate-700">
                {service.bulletPoints.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="zones"
        title="Zones desservies"
        eyebrow="Secteur d'intervention"
        background="subtle"
        cta={{
          label: "Voir le détail des zones",
          href: "/zones",
        }}
      >
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] md:items-start">
          <div className="space-y-3">
            <p className="text-sm">
              La société d&apos;ambulances intervient en priorité sur{" "}
              <strong>{siteConfig.zones.mainCity}</strong> et sur un ensemble de
              communes voisines. La liste exacte est à affiner et à valider
              avec le client avant la mise en production.
            </p>
            <ul className="mt-2 grid gap-1 text-sm text-slate-800 sm:grid-cols-2">
              {siteConfig.zones.items.map((zone) => (
                <li key={zone.slug}>• {zone.label}</li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-slate-600">
              Certains trajets plus éloignés peuvent être étudiés au cas par
              cas, en fonction des disponibilités et des contraintes horaires.
            </p>
          </div>
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-[13px] text-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Pages locales SEO (exemples)
            </h3>
            <ul className="space-y-1.5">
              {siteConfig.zones.localPagesExamples.map((page) => (
                <li key={page.path}>
                  <a
                    href={page.path}
                    className="underline-offset-2 hover:underline"
                  >
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-600">
              Ces pages locales sont fournies à titre d&apos;exemple. Elles
              devront être adaptées (ville, structure de soins, mots-clés) en
              fonction du secteur réel de l&apos;entreprise.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="process"
        title="Comment se déroule une prise en charge ?"
        eyebrow="Prise en charge & organisation"
        background="subtle"
        cta={{
          label: "Détails de la prise en charge",
          href: "/prise-en-charge",
        }}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.process.steps.map((step) => (
            <article
              key={step.id}
              className="space-y-1 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="text-sm text-slate-800">{step.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="faq"
        title="Questions fréquentes"
        eyebrow="FAQ transports sanitaires non urgents"
        background="subtle"
      >
        <div className="space-y-4">
          {siteConfig.faq.map((item) => (
            <details
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-slate-800">{item.answer}</p>
            </details>
          ))}
          <p className="mt-2 text-[11px] text-slate-600">
            Ces réponses sont fournies à titre informatif et ne remplacent pas
            un avis médical ni les informations officielles de l&apos;Assurance
            Maladie.
          </p>
        </div>
      </Section>

      <Section
        id="contact"
        title="Prendre contact"
        eyebrow="Standard & formulaire"
        background="subtle"
      >
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)]">
          <div className="space-y-3 text-sm">
            <p>
              Pour organiser un transport sanitaire non urgent ou poser une
              question, vous pouvez joindre le standard par téléphone ou nous
              envoyer les informations principales via le formulaire dédié.
            </p>
            <p>
              Afin de faciliter l&apos;organisation, pensez à rassembler si
              possible votre prescription médicale de transport, vos
              informations de couverture et les coordonnées de l&apos;établissement
              concerné.
            </p>
            <CTAButtons layout="inline" />
          </div>
          <div className="space-y-3">
            <OpeningHours ranges={siteConfig.openingHours} />
          </div>
        </div>
      </Section>
    </div>
  );
}
