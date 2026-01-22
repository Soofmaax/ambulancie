import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  background?: "default" | "subtle";
  cta?: {
    label: string;
    href: string;
  };
}

export default function Section({
  id,
  title,
  eyebrow,
  children,
  background = "default",
  cta,
}: SectionProps) {
  const containerClassName =
    background === "subtle"
      ? "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      : "space-y-6";

  return (
    <section id={id} className={containerClassName}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {title}
          </h2>
        </div>
        {cta && (
          <a
            href={cta.href}
            className="mt-2 inline-flex items-center justify-center rounded-full border border-sky-200 px-4 py-1.5 text-xs font-semibold text-sky-800 transition hover:border-sky-600 hover:text-sky-900 sm:mt-0"
          >
            {cta.label}
          </a>
        )}
      </div>
      <div className="mt-4 text-sm text-slate-800">{children}</div>
    </section>
  );
}