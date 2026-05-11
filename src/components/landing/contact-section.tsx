"use client";

import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";

export function ContactSection() {
  const t = useTranslations("contact");
  const roles = t.raw("roles") as { role: string; name: string; phone: string }[];

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3">
          {t("eyebrow")}
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8">{t("title")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map((r) => (
            <div key={r.role} className="bg-card border border-border rounded-xl p-6 space-y-3">
              <p className="text-xs text-primary font-mono uppercase tracking-wider">{r.role}</p>
              <p className="font-medium text-sm">{r.name}</p>
              <a
                href={`tel:${r.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {r.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
