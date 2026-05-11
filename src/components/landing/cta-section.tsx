"use client";

import { useTranslations } from "next-intl";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section id="register" className="py-24 px-6 bg-card">
      <div className="max-w-[1200px] mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold whitespace-pre-line leading-tight">
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-base max-w-[50ch] mx-auto">{t("subtitle")}</p>
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <a
            href="#"
            className="inline-flex items-center justify-center h-14 px-10 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors text-lg"
          >
            {t("button_candidate")}
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center h-14 px-10 border border-border text-foreground font-semibold rounded-xl hover:bg-accent transition-colors text-lg"
          >
            {t("button_hackathon")}
          </a>
        </div>
      </div>
    </section>
  );
}
