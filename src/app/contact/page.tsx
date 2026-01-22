import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAButtons from "@/components/CTAButtons";
import SocialLinks from "@/components/SocialLinks";
import { siteConfig } from "@data/site-config";
import { pageSeo } from "@/lib/page-seo";
import { createFormTimeToken } from "@/lib/anti-spam";

export const metadata: Metadata = pageSeo.contact;

type ContactSearchParams = {
  success?: string;
  error?: string;
};

export default function ContactPage({
  searchParams,
}: {
  searchParams?: ContactSearchParams;
}) {
  const phoneHref = siteConfig.contact.phoneMain
    ? `tel:${siteConfig.contact.phoneMain.replace(/\s+/g, "")}`
    : "#";

  const emailHref = siteConfig.contact.email
    ? `mailto:${siteConfig.contact.email}`
    : "#";

  const success = searchParams?.success;
  const error = searchParams?.error;

  let feedback:
    | {
        type: "success" | "error";
        message: string;
      }
    | null = null;

  if (success === "contact") {
    feedback = {
      type: "success",
      message: siteConfig.forms.contact.successMessage,
    };
  } else if (error) {
    const message =
      error === "phone"
        ? "Merci de renseigner un numéro de téléphone pour que l’équipe puisse vous rappeler."
        : error === "consent"
        ? "Le consentement au traitement de vos données est nécessaire pour envoyer le message."
        : siteConfig.forms.contact.errorMessage;

    feedback = {
      type: "error",
      message,
    };
  }

  const timeTokenName = "formTimeToken";
  const timeToken = createFormTimeToken(Date.now());

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title="Contact"
        eyebrow="Standard & formulaire de contact"
        background="subtle"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] md:items-start">
          <div className="space-y-5 text-sm">
            {feedback && (
              <div
                role="status"
                className={`rounded-2xl border px-4 py-3 text-xs ${
                  feedback.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-rose-200 bg-rose-50 text-rose-800"
                }`}
              >
                {feedback.message}
              </div>
            )}
            <div>
              <p>
                Pour toute question sur l&apos;organisation d&apos;un transport
                sanitaire non urgent ou sur les informations pratiques du
                service, vous pouvez joindre le standard ou utiliser le
                formulaire ci-contre.
              </p>
              {siteConfig.contact.phoneMain && (
                <a
                  href={phoneHref}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-sky-700 px-5 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-sky-600/70 transition hover:bg-sky-800 hover:ring-sky-700 sm:w-auto"
                >
                  Appeler maintenant
                </a>
              )}
            </div>
            <div className="space-y-2 text-sm text-slate-800">
              {siteConfig.contact.phoneMain && (
                <p>
                  <span className="font-semibold text-slate-900">
                    Téléphone :
                  </span>{" "}
                  <a
                    href={phoneHref}
                    className="underline-offset-2 hover:underline"
                  >
                    {siteConfig.contact.phoneMain}
                  </a>
                </p>
              )}
              {siteConfig.contact.email && (
                <p>
                  <span className="font-semibold text-slate-900">E-mail :</span>{" "}
                  <a
                    href={emailHref}
                    className="underline-offset-2 hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
              )}
              <p>
                <span className="font-semibold text-slate-900">Adresse :</span>{" "}
                {siteConfig.contact.address.line1},{" "}
                {siteConfig.contact.address.postalCode}{" "}
                {siteConfig.contact.address.city}
              </p>
            </div>
            <CTAButtons layout="inline" />
            <div className="pt-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Informations complémentaires
              </h2>
              <p className="mt-1 text-[11px] text-slate-600">
                Les liens éventuels vers d&apos;autres supports (fiche
                établissement, site principal…) pourront être ajoutés de manière
                discrète ci-dessous.
              </p>
              <SocialLinks demo />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Formulaire de contact
            </h2>
            <p className="mt-1 text-[11px] text-slate-600">
              Ce formulaire permet de poser une question ou de demander un
              complément d&apos;information. Pour l&apos;organisation d&apos;un
              transport précis, privilégiez le formulaire dédié à la{" "}
              <a
                href="/demande-transport"
                className="underline-offset-2 hover:underline"
              >
                demande de transport
              </a>
              .
            </p>
            <form
              className="mt-4 space-y-3 text-sm"
              method="POST"
              action="/api/request"
            >
              <input type="hidden" name="formType" value="contact" />
              <input
                type="hidden"
                name={timeTokenName}
                value={timeToken}
                aria-hidden="true"
              />
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Ne pas remplir ce champ</label>
                <input id="website" name="website" type="text" />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-slate-900"
                >
                  Nom (optionnel)
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-600/0 transition focus:border-sky-600 focus:ring-2"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-slate-900"
                >
                  E-mail (optionnel)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-600/0 transition focus:border-sky-600 focus:ring-2"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-slate-900"
                >
                  Téléphone (obligatoire)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-600/0 transition focus:border-sky-600 focus:ring-2"
                  placeholder="Votre numéro"
                />
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="block text-xs font-medium text-slate-900"
                >
                  Message
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-600/0 transition focus:border-sky-600 focus:ring-2"
                  placeholder="Votre message..."
                />
              </div>
              <div className="space-y-1 text-[11px] text-slate-700">
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-[3px] h-3.5 w-3.5 rounded border-slate-300 text-sky-700 focus:ring-sky-600"
                  />
                  <span>{siteConfig.forms.contact.rgpdConsentLabel}</span>
                </label>
                <a
                  href={siteConfig.forms.contact.privacyLink}
                  className="underline-offset-2 hover:underline"
                >
                  {siteConfig.forms.contact.privacyLinkLabel}
                </a>
              </div>
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-sky-700 px-4 py-2 text-xs font-semibold text-white shadow-sm ring-1 ring-sky-600/70 transition hover:bg-sky-800 hover:ring-sky-700"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
}