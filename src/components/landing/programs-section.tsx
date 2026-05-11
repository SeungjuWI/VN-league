"use client";

import { useTranslations } from "next-intl";

export function ProgramsSection() {
  const t = useTranslations("programs");

  const programs = [
    { title: t("interview_title"), desc: t("interview_desc"), detail: t("interview_detail") },
    { title: t("hackathon_title"), desc: t("hackathon_desc"), detail: t("hackathon_detail") },
    { title: t("mentoring_title"), desc: t("mentoring_desc"), detail: t("mentoring_detail") },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-pixel text-lg text-primary display-glow mb-2">[02_PROGRAMS]</p>
        <h2 className="font-pixel text-3xl sm:text-4xl text-foreground mb-12">{t("title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {programs.map((p) => (
            <div
              key={p.title}
              className="glow-box rounded-sm p-6 space-y-4 animate-border-glow"
            >
              <h3 className="font-pixel text-2xl text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <p className="font-mono text-xs text-primary uppercase tracking-wider">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
