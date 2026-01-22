import nodemailer from "nodemailer";
import { siteConfig } from "@data/site-config";

export interface TransportRequestPayload {
  formType: "transport-request" | "contact";
  name?: string;
  phone: string;
  email?: string;
  transportType?: string;
  date?: string;
  time?: string;
  from?: string;
  to?: string;
  position?: string;
  comment?: string;
  consent: boolean;
}

/**
 * Crée un transporteur Nodemailer à partir des variables d'environnement.
 * Si la configuration est absente, la fonction renvoie null et l'e-mail
 * ne sera pas envoyé (mais la requête ne plante pas).
 */
function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT
    ? Number(process.env.SMTP_PORT)
    : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    console.warn(
      "[email] SMTP non configuré. Aucun e-mail ne sera envoyé. " +
        "Renseignez SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS pour activer l'envoi."
    );
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

/**
 * Envoie un e-mail de notification pour une demande de transport ou un contact.
 * Si la configuration SMTP est absente, la fonction se contente de logguer la charge utile.
 */
export async function sendFormEmail(payload: TransportRequestPayload) {
  const to =
    process.env.FORM_EMAIL_TO ||
    siteConfig.contact.email ||
    process.env.SMTP_USER;

  if (!to) {
    console.warn(
      "[email] Aucun destinataire configuré pour les formulaires. " +
        "Définissez FORM_EMAIL_TO ou un e-mail de contact dans la configuration du site."
    );
  }

  const subjectPrefix =
    payload.formType === "transport-request"
      ? "[Demande de transport sanitaire]"
      : "[Contact site ambulances]";

  const subject = `${subjectPrefix} ${payload.phone}`;

  const lines: string[] = [];

  lines.push(`Type de formulaire : ${payload.formType}`);
  if (payload.name) lines.push(`Nom : ${payload.name}`);
  lines.push(`Téléphone : ${payload.phone}`);
  if (payload.email) lines.push(`E-mail : ${payload.email}`);
  if (payload.transportType)
    lines.push(`Type de transport : ${payload.transportType}`);
  if (payload.date || payload.time) {
    lines.push(
      `Date / heure souhaitées : ${payload.date || ""} ${payload.time || ""}`.trim()
    );
  }
  if (payload.from) lines.push(`Adresse de départ : ${payload.from}`);
  if (payload.to) lines.push(`Adresse de destination : ${payload.to}`);
  if (payload.position) lines.push(`Position (assis / allongé) : ${payload.position}`);
  if (payload.comment) {
    lines.push("");
    lines.push("Commentaire :");
    lines.push(payload.comment);
  }
  lines.push("");
  lines.push(`Consentement RGPD : ${payload.consent ? "oui" : "non"}`);

  const text = lines.join("\n");

  const transporter = createTransport();
  if (!transporter) {
    console.log("[email] Aperçu de la demande reçue :", { subject, text });
    return;
  }

  await transporter.sendMail({
    from:
      process.env.FORM_EMAIL_FROM ||
      siteConfig.contact.email ||
      process.env.SMTP_USER,
    to,
    subject,
    text,
  });
}