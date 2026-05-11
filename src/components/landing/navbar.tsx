"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === "vi" ? "ko" : "vi";
  const switchHref = `/${otherLocale}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-pixel text-lg text-primary display-glow tracking-wider">
          K·TECH CONNECT
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <a href="#schedule" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
            [{t("schedule")}]
          </a>
          <a href={switchHref} className="flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Globe className="w-3.5 h-3.5" />
            {otherLocale === "ko" ? "KO" : "VI"}
          </a>
          <Link href={`/${locale}/login`} className="btn-glow font-pixel text-sm px-4 py-1.5 rounded-sm text-primary-foreground uppercase tracking-wider transition-all">
            REGISTER
          </Link>
        </div>

        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-3">
          <a href="#schedule" className="block font-mono text-xs text-muted-foreground uppercase tracking-wider" onClick={() => setMobileOpen(false)}>
            [{t("schedule")}]
          </a>
          <a href={switchHref} className="flex items-center gap-1 font-mono text-xs text-muted-foreground" onClick={() => setMobileOpen(false)}>
            <Globe className="w-3.5 h-3.5" />
            {otherLocale === "ko" ? "한국어" : "Tiếng Việt"}
          </a>
          <Link href={`/${locale}/login`} className="btn-glow block text-center font-pixel text-sm px-4 py-2 rounded-sm text-primary-foreground uppercase" onClick={() => setMobileOpen(false)}>
            REGISTER
          </Link>
        </div>
      )}
    </nav>
  );
}
