import crypto from "crypto";
import { siteConfig } from "@data/site-config";

const DEFAULT_SECRET = "dev-anti-spam-secret";

/**
 * Secret utilisé pour signer les jetons anti-spam.
 * À surcharger en production via la variable d'environnement FORM_SPAM_SECRET.
 */
const FORM_SPAM_SECRET =
  process.env.FORM_SPAM_SECRET && process.env.FORM_SPAM_SECRET.trim().length > 0
    ? process.env.FORM_SPAM_SECRET
    : DEFAULT_SECRET;

/**
 * Crée un jeton signé à partir d'un timestamp (en millisecondes).
 * Le timestamp est généré côté serveur au rendu de la page.
 */
export function createFormTimeToken(timestampMs: number): string {
  const payload = String(timestampMs);
  const hmac = crypto.createHmac("sha256", FORM_SPAM_SECRET);
  hmac.update(payload);
  return `${payload}.${hmac.digest("hex")}`;
}

/**
 * Vérifie qu'un jeton de temps est valide et respecte le délai minimal.
 * Retourne soit le timestamp décodé, soit null en cas d'erreur.
 */
export function verifyFormTimeToken(
  token: string | null,
  minDelayMs: number
): number | null {
  if (!token) return null;

  const [timestampPart, signature] = token.split(".");
  if (!timestampPart || !signature) return null;

  const hmac = crypto.createHmac("sha256", FORM_SPAM_SECRET);
  hmac.update(timestampPart);
  const expectedSignature = hmac.digest("hex");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  const timestampMs = Number(timestampPart);
  if (!Number.isFinite(timestampMs)) return null;

  const now = Date.now();
  if (now - timestampMs < minDelayMs) {
    return null;
  }

  return timestampMs;
}

/**
 * Expose les paramètres anti-spam de manière centralisée.
 * Utilisé par les formulaires pour connaître le délai minimal côté client.
 */
export const antiSpamConfig = {
  requestMinDelayMs: siteConfig.forms.requestTransport.minSubmitDelayMs,
  contactMinDelayMs: siteConfig.forms.contact.minSubmitDelayMs,
};