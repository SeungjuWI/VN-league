"use client";

import { useTranslations } from "next-intl";
import { Calendar, Code, Briefcase } from "lucide-react";

export function OverviewSection() {
  const t = useTranslations("overview");

  const days = [
    {
      icon: Calendar,
      date: t("day1_date"),
      theme: t("day1_theme"),
      desc: t("day1_desc"),
      num: "D1",
    },
    {
      icon: Code,
      date: t("day2_date"),
      theme: t("day2_theme"),
      desc: t("day2_desc"),
      num: "D2",
    },
    {
      icon: Briefcase,
      date: t("day3_date"),
      theme: t("day3_theme"),
      desc: t("day3_desc"),
      num: "D3",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3">
          {t("eyebrow")}
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-12">{t("title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {days.map((day) => (
            <div
              key={day.num}
              className="bg-card border border-border rounded-2xl p-8 space-y-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <day.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-mono text-xs text-primary font-bold">{day.num}</span>
              </div>
              <div>
                <p className="text-primary font-mono text-sm mb-1">{day.date}</p>
                <h3 className="text-lg font-semibold">{day.theme}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{day.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
