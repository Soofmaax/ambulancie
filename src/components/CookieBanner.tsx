"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ConsentStatus = "accepted" | "rejected";

const STORAGE_KEY = "cookie_consent_status";

function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export default function CookieBanner() {
  const [status, setStatus] = useState&lt;ConsentStatus | null&gt;(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() =&gt; {
    setHasMounted(true);
    setStatus(getStoredConsent());
  }, []);

  const handleChoice = (newStatus: ConsentStatus) =&gt; {
    setStatus(newStatus);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, newStatus);
      // Si plus tard vous ajoutez des scripts de tracking,
      // c'est ici que vous pourrez les activer/désactiver selon le consentement.
    }
  };

  if (!hasMounted || status !== null) {
    return null;
  }

  return (
    &lt;section
      aria-label="Bannière de gestion des cookies"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-4 py-3 text-xs text-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-6 sm:text-sm"
    &gt;
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="leading-snug text-slate-100">
          Nous utilisons des cookies strictement nécessaires au fonctionnement du site
          et à la mesure d&apos;audience anonyme. Vous pouvez accepter ou refuser ces
          cookies non essentiels.
          {" "}
          <Link
            href="/mentions-legales"
            className="font-semibold text-amber-300 underline-offset-2 hover:text-amber-200 hover:underline"
          >
            En savoir plus
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() =&gt; handleChoice("rejected")}
            className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-200/80 hover:bg-slate-900/80 sm:px-4 sm:text-sm"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() =&gt; handleChoice("accepted")}
            className="rounded-full bg-amber-400 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-sm ring-1 ring-amber-300/70 transition hover:bg-amber-300 hover:ring-amber-200 sm:px-4 sm:text-sm"
          >
            Accepter
          </button>
        </div>
      </div>
    &lt;/section&gt;
  );
}