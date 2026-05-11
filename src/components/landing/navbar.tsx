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

  const links = [
    { label: t("schedule"), href: "#schedule" },
    { label: t("register"), href: "#register" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="text-primary font-bold text-lg tracking-tight">K-Tech</span>
          <span className="text-muted-foreground text-sm font-medium">Connect</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={switchHref}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="w-4 h-4" />
            {otherLocale === "ko" ? "한국어" : "Tiếng Việt"}
          </a>
          <a
            href="#register"
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t("register")}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={switchHref}
            className="flex items-center gap-2 text-sm text-muted-foreground"
            onClick={() => setMobileOpen(false)}
          >
            <Globe className="w-4 h-4" />
            {otherLocale === "ko" ? "한국어" : "Tiếng Việt"}
          </a>
          <a
            href="#register"
            className="block text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg text-center"
            onClick={() => setMobileOpen(false)}
          >
            {t("register")}
          </a>
        </div>
      )}
    </nav>
  );
}
