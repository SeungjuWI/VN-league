"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-border py-6 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-pixel text-sm text-primary">K·TECH CONNECT</span>
        <div className="flex items-center gap-4 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
          <Link
            href={`/${locale}/guide/corporate`}
            className="btn-ghost px-3 py-1.5 rounded text-[#C77DFF] hover:text-foreground transition-colors"
          >
            {t("corporate_guide")}
          </Link>
          <a href="#" className="hover:text-foreground transition-colors">{t("terms")}</a>
          <a href="#" className="hover:text-foreground transition-colors">{t("privacy")}</a>
          <a href="mailto:contact@likelion.vn" className="hover:text-foreground transition-colors">{t("contact")}</a>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground">{t("copyright")}</p>
      </div>
    </footer>
  );
}
