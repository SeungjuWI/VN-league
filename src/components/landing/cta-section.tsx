"use client";

import { useTranslations } from "next-intl";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section id="register" className="py-24 px-6">
      <div className="max-w-[600px] mx-auto text-center space-y-6">
        <h2 className="font-pixel text-4xl sm:text-5xl text-foreground display-glow whitespace-pre-line leading-tight">
          {t("title")}
        </h2>
        <p className="text-muted-foreground">{t("subtitle")}</p>
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <a href="#" className="btn-glow font-pixel text-xl px-8 py-3 rounded-sm text-primary-foreground uppercase tracking-wider transition-all">
            {t("button_candidate")}
          </a>
          <a href="#" className="btn-ghost font-pixel text-xl px-8 py-3 rounded-sm text-foreground uppercase tracking-wider transition-all">
            {t("button_hackathon")}
          </a>
        </div>
      </div>
    </section>
  );
}
