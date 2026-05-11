"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type ScheduleItem = { time: string; main: string; side: string; note: string };

export function ScheduleSection() {
  const t = useTranslations("schedule");
  const [activeDay, setActiveDay] = useState(0);

  const days = [
    { title: t("day1_title"), items: t.raw("day1") as ScheduleItem[] },
    { title: t("day2_title"), items: t.raw("day2") as ScheduleItem[] },
    { title: t("day3_title"), items: t.raw("day3") as ScheduleItem[] },
  ];

  return (
    <section id="schedule" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3">
          {t("eyebrow")}
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8">{t("title")}</h2>

        {/* Day tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeDay === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {day.title}
            </button>
          ))}
        </div>

        {/* Schedule table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[140px_1fr_1fr] text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
            <div className="px-4 py-3">{t("col_time")}</div>
            <div className="px-4 py-3">{t("col_main")}</div>
            <div className="px-4 py-3">{t("col_side")}</div>
          </div>

          {days[activeDay].items.map((item, i) => {
            const isBreak = item.main.toLowerCase().includes("nghỉ") || item.main.toLowerCase().includes("점심");
            return (
              <div
                key={i}
                className={`grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[140px_1fr_1fr] border-b border-border last:border-0 ${
                  isBreak ? "bg-muted/30" : ""
                }`}
              >
                <div className="px-4 py-3 font-mono text-xs text-primary">{item.time}</div>
                <div className="px-4 py-3 text-sm">{item.main}</div>
                <div className="px-4 py-3 text-sm text-muted-foreground">{item.side || "—"}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
