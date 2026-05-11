"use client";

import { useTranslations } from "next-intl";
import { Users, Code, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProgramsSection() {
  const t = useTranslations("programs");

  const programs = [
    {
      icon: Users,
      title: t("interview_title"),
      desc: t("interview_desc"),
      detail: t("interview_detail"),
      accent: true,
    },
    {
      icon: Code,
      title: t("hackathon_title"),
      desc: t("hackathon_desc"),
      detail: t("hackathon_detail"),
      accent: false,
    },
    {
      icon: MessageSquare,
      title: t("mentoring_title"),
      desc: t("mentoring_desc"),
      detail: t("mentoring_detail"),
      accent: false,
    },
  ];

  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3">
          {t("eyebrow")}
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-12">{t("title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div
              key={p.title}
              className={`rounded-2xl p-8 space-y-4 border ${
                p.accent
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-background"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                {p.detail}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
