"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold text-sm">LIKELION</span>
          <span className="text-muted-foreground text-xs">Vietnam</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">{t("terms")}</a>
          <a href="#" className="hover:text-foreground transition-colors">{t("privacy")}</a>
          <a href="mailto:contact@likelion.vn" className="hover:text-foreground transition-colors">
            {t("contact")}
          </a>
        </div>

        <p className="text-xs text-muted-foreground">{t("copyright")}</p>
      </div>
    </footer>
  );
}
