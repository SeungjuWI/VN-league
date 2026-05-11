"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Countdown } from "./countdown";
import { MapPin } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const s = useTranslations("stats");

  const stats = [
    { value: s("companies_value"), label: s("companies") },
    { value: s("interviews_value"), label: s("interviews") },
    { value: s("matches_value"), label: s("matches") },
    { value: s("hackathon_value"), label: s("hackathon") },
  ];

  return (
    <section className="relative min-h-screen flex items-center dot-grid">
      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-3 space-y-6">
            <Badge
              variant="outline"
              className="border-primary/40 text-primary font-mono text-xs tracking-widest px-3 py-1"
            >
              {t("badge")}
            </Badge>

            <div>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-2">
                {t("event_name")}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold leading-[1.05] tracking-tight">
                <span className="text-primary">{t("title_line1")}</span>
                <br />
                {t("title_line2")}
              </h1>
              <p className="mt-3 text-xl sm:text-2xl font-medium text-muted-foreground italic">
                {t("subtitle")}
              </p>
              <p className="mt-4 text-muted-foreground text-base max-w-[55ch] leading-relaxed">
                {t("description")}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{t("venue")}</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#register"
                className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-base"
              >
                {t("cta_candidate")}
              </a>
              <a
                href="#companies"
                className="inline-flex items-center justify-center h-12 px-6 border border-border text-foreground hover:bg-accent transition-colors rounded-lg text-base font-medium"
              >
                {t("cta_company")}
              </a>
            </div>
          </div>

          {/* Right — Countdown + Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                {t("deadline_label")}
              </p>
              <Countdown targetDate="2026-05-19T09:00:00+07:00" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold font-mono text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
