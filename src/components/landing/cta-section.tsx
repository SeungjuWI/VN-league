"use client";

import { useTranslations, useLocale } from "next-intl";

export function CtaSection() {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <section className="py-24 px-6">
      <div className="max-w-[600px] mx-auto text-center space-y-6">
        <h2 className="font-pixel text-4xl sm:text-5xl text-foreground display-glow whitespace-pre-line leading-tight">
          {t("title")}
        </h2>
        <p className="text-muted-foreground">{t("subtitle")}</p>
        <a
          href={`/${locale}/login`}
          className="btn-glow inline-block font-pixel text-xl px-10 py-3 rounded-sm text-primary-foreground uppercase tracking-wider transition-all"
        >
          {t("button")}
        </a>
      </div>
    </section>
  );
}
