import { siteConfig } from "@data/site-config";

interface SocialLinksProps {
  demo?: boolean;
}

export default function SocialLinks({ demo = false }: SocialLinksProps) {
  const social = {
    // Placeholders – à compléter éventuellement dans la configuration du site
    website: "",
    googleBusiness: "",
  };

  const items = [
    {
      key: "website",
      label: "Site principal",
      href: social.website || "#",
      isConfigured: !!social.website,
    },
    {
      key: "googleBusiness",
      label: "Fiche établissement",
      href: social.googleBusiness || "#",
      isConfigured: !!social.googleBusiness,
    },
  ];

  const visibleItems = items.filter((item) => (demo ? true : item.isConfigured));

  if (visibleItems.length === 0 && !demo) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2 text-xs">
      {visibleItems.map((item) =>
        item.isConfigured ? (
          <a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-sky-200 px-3 py-1 text-[11px] font-medium text-sky-800 transition hover:border-sky-600 hover:text-sky-900"
          >
            {item.label}
          </a>
        ) : (
          demo && (
            <span
              key={item.key}
              className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-500"
            >
              {item.label}
            </span>
          )
        )
      )}
      {demo && (
        <span className="text-[11px] text-slate-500">
          Les liens vers vos comptes officiels (site principal, fiche établissement, etc.)
          pourront être ajoutés ici si besoin.
        </span>
      )}
    </div>
  );
}