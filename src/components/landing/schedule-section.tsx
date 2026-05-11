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
        <p className="font-pixel text-lg text-primary display-glow mb-2">[03_SCHEDULE]</p>
        <h2 className="font-pixel text-3xl sm:text-4xl text-foreground mb-8">{t("title")}</h2>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`font-pixel text-base px-4 py-2 rounded-sm whitespace-nowrap transition-all ${
                activeDay === i
                  ? "btn-glow text-primary-foreground"
                  : "btn-ghost text-muted-foreground hover:text-foreground"
              }`}
            >
              {day.title}
            </button>
          ))}
        </div>

        <div className="glow-box rounded-sm overflow-hidden">
          <div className="grid grid-cols-[110px_1fr_1fr] sm:grid-cols-[140px_1fr_1fr] font-mono text-[10px] text-muted-foreground uppercase tracking-[0.12em] border-b border-border">
            <div className="px-4 py-3">{t("col_time")}</div>
            <div className="px-4 py-3">{t("col_main")}</div>
            <div className="px-4 py-3">{t("col_side")}</div>
          </div>

          {days[activeDay].items.map((item, i) => {
            const isBreak = item.main.toLowerCase().includes("nghỉ") || item.main.toLowerCase().includes("점심");
            return (
              <div
                key={i}
                className={`grid grid-cols-[110px_1fr_1fr] sm:grid-cols-[140px_1fr_1fr] border-b border-border/50 last:border-0 ${
                  isBreak ? "bg-primary/5" : ""
                }`}
              >
                <div className="px-4 py-3 font-pixel text-sm text-primary">{item.time}</div>
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
