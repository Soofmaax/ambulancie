import { siteConfig } from "@data/site-config";

interface CTAButtonsProps {
  layout?: "inline" | "stacked";
  /**
   * Contexte d'affichage :
   * - "default" : Appeler / Demande de transport / Itinéraire
   * - "hero" : mise en avant de l'appel et de la demande de transport
   */
  context?: "default" | "hero";
}

export default function CTAButtons({
  layout = "inline",
  context = "default",
}: CTAButtonsProps) {
  const phoneHref = siteConfig.contact.phoneMain
    ? `tel:${siteConfig.contact.phoneMain.replace(/\s+/g, "")}`
    : "#";

  const mapHref = siteConfig.contact.address.mapUrl || "#";

  const baseClass =
    "inline-flex items-center justify-center rounded-full text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50";

  const primaryClass =
    "bg-sky-700 px-4 py-2 text-white shadow-sm ring-1 ring-sky-600/70 hover:bg-sky-800 hover:ring-sky-700";

  const secondaryClass =
    "border border-sky-200 px-4 py-2 text-sky-800 hover:border-sky-600 hover:text-sky-900";

  const layoutClass =
    layout === "stacked"
      ? "flex flex-col gap-3"
      : "flex flex-wrap items-center gap-3";

  if (context === "hero") {
    return (
      <div className={layoutClass}>
        <a
          href={phoneHref}
          className={`${baseClass} ${primaryClass} text-sm sm:text-base px-6 py-2.5`}
        >
          Appeler maintenant
        </a>
        <a
          href="/demande-transport"
          className={`${baseClass} ${secondaryClass} text-sm sm:text-base px-6 py-2.5`}
        >
          Demande de transport
        </a>
      </div>
    );
  }

  return (
    <div className={layoutClass}>
      <a href={phoneHref} className={`${baseClass} ${primaryClass}`}>
        Appeler maintenant
      </a>
      <a
        href="/demande-transport"
        className={`${baseClass} ${secondaryClass}`}
      >
        Demande de transport
      </a>
      <a
        href={mapHref}
        target="_blank"
        rel="noreferrer"
        className={`${baseClass} ${secondaryClass}`}
      >
        Itinéraire
      </a>
    </div>
  );
}