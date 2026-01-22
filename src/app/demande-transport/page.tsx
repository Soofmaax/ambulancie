import type { Metadata } from "next";
import Section from "@/components/Section";
import { pageSeo } from "@/lib/page-seo";
import { siteConfig } from "@data/site-config";
import { createFormTimeToken } from "@/lib/anti-spam";

export const metadata: Metadata = pageSeo.demandeTransport;

type DemandeTransportSearchParams = {
  success?: string;
  error?: string;
};

export default function DemandeTransportPage({
  searchParams,
}: {
  searchParams?: DemandeTransportSearchParams;
}) {
  const success = searchParams?.success;
  const error = searchParams?.error;

  let feedback:
    | {
        type: "success" | "error";
        message: string;
      }
    | null = null;

  if (success === "request") {
    feedback = {
      type: "success",
      message: siteConfig.forms.requestTransport.successMessage,
    };
  } else if (error) {
    const message =
      error === "phone"
        ? "Merci de renseigner un numéro de téléphone pour que l’équipe puisse vous rappeler."
        : error === "consent"
        ? "Le consentement au traitement de vos données est nécessaire pour envoyer la demande."
        : siteConfig.forms.requestTransport.errorMessage;

    feedback = {
      type: "error",
      message,
    };
  }

  const timeToken = createFormTimeToken(Date.now());

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Section
        title="Demande de transport sanitaire"
        eyebrow="Formulaire pour transports non urgents"
        background="subtle"
      >
        {feedback && (
          <div
            role="status"
            className={`mb-4 rounded-2xl border px-4 py-3 text-xs ${
              feedback.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-rose-200 bg-rose-50 text-rose-800"
            }`}
          >
            {feedback.message}
          </div>
        )}
        <div className="space-y-4 text-sm text-slate-800">
          <p>
            Ce formulaire permet de transmettre les informations principales
            pour organiser un transport sanitaire non urgent (ambulance, VSL ou
            transport assis). Il ne remplace pas un appel d&apos;urgence : en
            cas de situation vitale, contactez le 15 (SAMU) ou le 112.
          </p>
        </div>

        <form
          className="mt-6 space-y-4 text-sm"
          method="POST"
          action="/api/request"
        >
          <input type="hidden" name="formType" value="transport-request" />
          <input type="hidden" name="formTimeToken" value={timeToken} />
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website">Ne pas remplir ce champ</label>
            <input id="website" name="website" type="text" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
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
                placeholder="Nom du patient ou de la personne à transporter"
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
                placeholder="Numéro sur lequel vous joindre"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
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
                placeholder="Adresse e-mail de contact"
              />
            </div>
            <div>
              <label
                htmlFor="transportType"
                className="block text-xs font-medium text-slate-900"
              >
                Type de transport souhaité
              </label>
              <select
                id="transportType"
                name="transportType"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-600/0 transition focus:border-sky-600 focus:ring-2"
                defaultValue=""
              >
                <option value="" disabled>
                  À définir ensemble selon la prescription
                </option>
                <option value="ambulance">Ambulance</option>
                <option value="vsl">VSL (Véhicule Sanitaire Léger)</option>
                <option value="assis">Transport assis professionnalisé</option>
                <option value="a-definir">À définir avec le standard</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="date"
                className="block text-xs font-medium text-slate-900"
              >
                Date souhaitée
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-600/0 transition focus:border-sky-600 focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-xs font-medium text-slate-900"
              >
                Heure de convocation (si connue)
              </label>
              <input
                id="time"
                name="time"
                type="time"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-600/0 transition focus:border-sky-600 focus:ring-2"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="from"
                className="block text-xs font-medium text-slate-900"
              >
                Adresse de départ
              </label>
              <input
                id="from"
                name="from"
                type="text"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-600/0 transition focus:border-sky-600 focus:ring-2"
                placeholder="Adresse de prise en charge"
              />
            </div>
            <div>
              <label
                htmlFor="to"
                className="block text-xs font-medium text-slate-900"
              >
                Adresse de destination
              </label>
              <input
                id="to"
                name="to"
                type="text"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-600/0 transition focus:border-sky-600 focus:ring-2"
                placeholder="Établissement ou cabinet de destination"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="position"
              className="block text-xs font-medium text-slate-900"
            >
              Position pendant le transport
            </label>
            <select
              id="position"
              name="position"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-600/0 transition focus:border-sky-600 focus:ring-2"
              defaultValue=""
            >
              <option value="" disabled>
                À préciser si connu
              </option>
              <option value="assis">Assis</option>
              <option value="allonge">Allongé</option>
              <option value="a-definir">À définir avec le standard</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-xs font-medium text-slate-900"
            >
              Commentaire (optionnel)
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-600/0 transition focus:border-sky-600 focus:ring-2"
              placeholder="Précisions utiles : contexte médical, besoin d'accompagnement spécifique, fréquence des transports, etc."
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
              <span>{siteConfig.forms.requestTransport.rgpdConsentLabel}</span>
            </label>
            <a
              href={siteConfig.forms.requestTransport.privacyLink}
              className="underline-offset-2 hover:underline"
            >
              {siteConfig.forms.requestTransport.privacyLinkLabel}
            </a>
          </div>

          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-sky-700 px-4 py-2 text-xs font-semibold text-white shadow-sm ring-1 ring-sky-600/70 transition hover:bg-sky-800 hover:ring-sky-700"
          >
            Envoyer la demande
          </button>
        </form>
      </Section>
    </div>
  );
}