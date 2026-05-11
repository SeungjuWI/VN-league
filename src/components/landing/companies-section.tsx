"use client";

import { useTranslations } from "next-intl";
import { CheckCircle, Circle } from "lucide-react";

export function CompaniesSection() {
  const t = useTranslations("forCompanies");

  const checkinRules = t.raw("checkin_rules") as string[];
  const required = t.raw("prepare_required") as string[];
  const optional = t.raw("prepare_optional") as string[];

  return (
    <section id="companies" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3">
          {t("eyebrow")}
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-12">{t("title")}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Check-in guide */}
          <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
            <h3 className="text-lg font-semibold">{t("checkin_title")}</h3>
            <ul className="space-y-3">
              {checkinRules.map((rule, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary font-mono text-xs font-bold mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Preparation */}
          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <h3 className="text-lg font-semibold">{t("prepare_title")}</h3>

            <div className="space-y-2">
              <p className="text-xs font-medium text-primary uppercase tracking-wider">Required</p>
              {required.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Optional</p>
              {optional.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Circle className="w-4 h-4 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
