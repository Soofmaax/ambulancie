import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, defaultLocale } from "@/lib/seo";
import { siteConfig } from "@data/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = SITE_URL.replace(/\/$/, "");

const socialLinks: string[] = []; // À compléter le cas échéant (fiche Google, réseaux sociaux…)

const openingHoursForSchema = siteConfig.openingHours
  .map((range) => {
    const text = range.days.toLowerCase();
    let prefix = "Mo-Su";

    if (text.includes("lundi") && text.includes("vendredi")) {
      prefix = "Mo-Fr";
    } else if (text.includes("samedi") && text.includes("dimanche")) {
      prefix = "Sa-Su";
    }

    const slot = range.slots[0];
    if (!slot) return undefined;

    return `${prefix} ${slot.from}-${slot.to}`;
  })
  .filter((v): v is string => Boolean(v));

const jsonLdLocalBusiness: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${baseUrl}/#ambulance-business`,
  name: siteConfig.business.brandName,
  legalName: siteConfig.business.legalName || undefined,
  description: siteConfig.seo.defaultDescription,
  url: baseUrl,
  telephone: siteConfig.contact.phoneMain,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.line1,
    postalCode: siteConfig.contact.address.postalCode,
    addressLocality: siteConfig.contact.address.city,
    addressCountry: siteConfig.contact.address.country,
  },
  openingHours: openingHoursForSchema,
  areaServed: {
    "@type": "AdministrativeArea",
    name: siteConfig.zones.catchmentLabel || siteConfig.zones.mainCity,
  },
  sameAs: socialLinks.length > 0 ? socialLinks : undefined,
};

if (
  siteConfig.contact.address.latitude &&
  siteConfig.contact.address.longitude
) {
  (jsonLdLocalBusiness as Record<string, unknown>).geo = {
    "@type": "GeoCoordinates",
    latitude: siteConfig.contact.address.latitude,
    longitude: siteConfig.contact.address.longitude,
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: `%s | ${siteConfig.business.brandName}`,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: "/",
    siteName: siteConfig.business.brandName,
    locale: defaultLocale,
    type: "website",
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      fr: "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const phoneHref = siteConfig.contact.phoneMain
    ? `tel:${siteConfig.contact.phoneMain.replace(/\s+/g, "")}`
    : "#";

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdLocalBusiness),
          }}
        />
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
              <Link href="/" className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
                  {siteConfig.business.brandName}
                </span>
                <span className="text-[11px] text-sky-900/80">
                  {siteConfig.business.baseline}
                </span>
              </Link>
              <nav
                aria-label="Navigation principale"
                className="flex items-center gap-3 text-xs font-medium text-slate-800 sm:gap-5 sm:text-sm"
              >
                <Link
                  href="/services"
                  className="hidden text-slate-700 transition-colors hover:text-sky-800 sm:inline"
                >
                  Services
                </Link>
                <Link
                  href="/prise-en-charge"
                  className="hidden text-slate-700 transition-colors hover:text-sky-800 sm:inline"
                >
                  Prise en charge
                </Link>
                <Link
                  href="/zones"
                  className="hidden text-slate-700 transition-colors hover:text-sky-800 sm:inline"
                >
                  Zones desservies
                </Link>
                <Link
                  href="/demande-transport"
                  className="hidden rounded-full border border-sky-200 px-3 py-1.5 text-xs font-semibold text-sky-800 transition-colors hover:border-sky-600 hover:text-sky-900 sm:inline-flex sm:text-sm"
                >
                  Demande de transport
                </Link>
                <Link
                  href="/contact"
                  className="hidden text-slate-700 transition-colors hover:text-sky-800 sm:inline"
                >
                  Contact
                </Link>
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center rounded-full bg-sky-700 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm ring-1 ring-sky-600/70 transition hover:bg-sky-800 hover:ring-sky-700 sm:px-4 sm:text-xs"
                >
                  Appeler maintenant
                </a>
              </nav>
            </div>
          </header>

          <div className="border-b border-sky-100 bg-sky-50">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-2 text-xs text-sky-900 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="font-medium">
                {siteConfig.contact.emergencyMessage}
              </p>
              <p className="text-[11px] text-sky-900/80">
                {siteConfig.contact.nonEmergencyClarification}
              </p>
            </div>
          </div>

          <main className="flex-1 bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>

          <footer className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 text-xs text-slate-700 sm:flex-row sm:justify-between sm:px-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900">
                  {siteConfig.business.brandName}
                </p>
                <p className="text-slate-700">
                  {siteConfig.contact.address.line1}
                  <br />
                  {siteConfig.contact.address.postalCode}{" "}
                  {siteConfig.contact.address.city}
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {siteConfig.contact.phoneMain && (
                    <a
                      href={phoneHref}
                      className="underline-offset-2 hover:underline"
                    >
                      Tél : {siteConfig.contact.phoneMain}
                    </a>
                  )}
                  {siteConfig.contact.email && (
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {siteConfig.contact.email}
                    </a>
                  )}
                  {siteConfig.contact.address.mapUrl && (
                    <a
                      href={siteConfig.contact.address.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-offset-2 hover:underline"
                    >
                      Itinéraire
                    </a>
                  )}
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-700 sm:text-right">
                <p>
                  &copy; {new Date().getFullYear()}{" "}
                  {siteConfig.business.brandName}. Tous droits réservés.
                </p>
                {siteConfig.business.legalName && (
                  <p>{siteConfig.business.legalName}</p>
                )}
                {siteConfig.business.siret && (
                  <p>SIRET : {siteConfig.business.siret}</p>
                )}
                <div className="flex flex-wrap gap-3 sm:justify-end">
                  <Link
                    href="/mentions-legales"
                    className="underline-offset-2 hover:underline"
                  >
                    Mentions légales
                  </Link>
                  <Link
                    href="/protection-des-donnees"
                    className="underline-offset-2 hover:underline"
                  >
                    Protection des données
                  </Link>
                </div>
                <p className="text-[11px] text-slate-500">
                  Site vitrine de démonstration réalisé avec Next.js, TypeScript
                  &amp; Tailwind CSS.
                </p>
              </div>
            </div>
          </footer>

          <a
            href={phoneHref}
            className="fixed bottom-4 left-1/2 z-40 w-[min(90%,22rem)] -translate-x-1/2 rounded-full bg-sky-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-sky-900/40 ring-1 ring-sky-600/70 transition hover:bg-sky-800 hover:ring-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 sm:hidden"
          >
            Appeler maintenant
          </a>
        </div>
      </body>
    </html>
  );
}
