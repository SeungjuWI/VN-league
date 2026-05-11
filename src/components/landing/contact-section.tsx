"use client";

import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";

export function ContactSection() {
  const t = useTranslations("contact");
  const roles = t.raw("roles") as { role: string; name: string; phone: string }[];

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-pixel text-lg text-primary display-glow mb-2">[06_CONTACT]</p>
        <h2 className="font-pixel text-3xl sm:text-4xl text-foreground mb-8">{t("title")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map((r) => (
            <div key={r.role} className="glow-box rounded-sm p-5 space-y-2 animate-border-glow">
              <p className="font-mono text-[10px] text-[#FF6FD8] uppercase tracking-[0.15em]">{r.role}</p>
              <p className="font-pixel text-base text-foreground">{r.name}</p>
              <a
                href={`tel:${r.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
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
