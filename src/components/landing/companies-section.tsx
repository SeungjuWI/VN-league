"use client";

import { useTranslations } from "next-intl";

export function CompaniesSection() {
  const t = useTranslations("forCompanies");
  const checkinRules = t.raw("checkin_rules") as string[];
  const required = t.raw("prepare_required") as string[];
  const optional = t.raw("prepare_optional") as string[];

  return (
    <section id="companies" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-pixel text-lg text-primary display-glow mb-2">[05_COMPANIES]</p>
        <h2 className="font-pixel text-3xl sm:text-4xl text-foreground mb-12">{t("title")}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="glow-box rounded-sm p-6 space-y-4 animate-border-glow">
            <h3 className="font-pixel text-xl text-foreground">{t("checkin_title")}</h3>
            <ul className="space-y-2">
              {checkinRules.map((rule, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-muted-foreground">
                  <span className="font-pixel text-primary text-base">{String(i + 1).padStart(2, "0")}</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="glow-box rounded-sm p-6 space-y-5 animate-border-glow">
            <h3 className="font-pixel text-xl text-foreground">{t("prepare_title")}</h3>
            <div className="space-y-2">
              <p className="font-mono text-[10px] text-[#FF6FD8] uppercase tracking-[0.15em]">Required</p>
              {required.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="font-pixel text-primary">+</span>
                  {item}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.15em]">Optional</p>
              {optional.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-pixel">-</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
