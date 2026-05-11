"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border py-6 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-pixel text-sm text-primary">K·TECH CONNECT</span>
        <div className="flex items-center gap-4 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
          <a href="#" className="hover:text-foreground transition-colors">{t("terms")}</a>
          <a href="#" className="hover:text-foreground transition-colors">{t("privacy")}</a>
          <a href="mailto:contact@likelion.vn" className="hover:text-foreground transition-colors">{t("contact")}</a>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground">{t("copyright")}</p>
      </div>
    </footer>
  );
}
