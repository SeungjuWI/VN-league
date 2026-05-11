"use client";

import { useTranslations } from "next-intl";

export function OverviewSection() {
  const t = useTranslations("overview");

  const days = [
    { num: "D1", date: t("day1_date"), theme: t("day1_theme"), desc: t("day1_desc") },
    { num: "D2", date: t("day2_date"), theme: t("day2_theme"), desc: t("day2_desc") },
    { num: "D3", date: t("day3_date"), theme: t("day3_theme"), desc: t("day3_desc") },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-pixel text-lg text-primary display-glow mb-2">[01_OVERVIEW]</p>
        <h2 className="font-pixel text-3xl sm:text-4xl text-foreground mb-12">{t("title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {days.map((day) => (
            <div key={day.num} className="glow-box rounded-sm p-6 space-y-3 animate-border-glow">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-2xl text-primary display-glow">{day.num}</span>
                <span className="font-mono text-xs text-muted-foreground">{day.date}</span>
              </div>
              <h3 className="font-pixel text-xl text-foreground">{day.theme}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{day.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
