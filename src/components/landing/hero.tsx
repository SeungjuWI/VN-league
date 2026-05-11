"use client";

import { useTranslations, useLocale } from "next-intl";
import { Countdown } from "./countdown";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center hero-effects overflow-hidden px-6">
      {/* Partner logos */}
      <div className="absolute top-20 left-0 right-0 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {[
            { src: "/logos/mss.svg", alt: "MSS", w: 130 },
            { src: "/logos/kosme.svg", alt: "KOSME", w: 110 },
            { src: "/logos/likelion.svg", alt: "LIKELION", w: 110 },
            { src: "/logos/jobkorea.svg", alt: "JOBKOREA", w: 100 },
          ].map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={28}
              className="h-6 w-auto opacity-40"
            />
          ))}
        </div>
      </div>

      {/* Center content */}
      <div className="text-center space-y-6 relative z-10 max-w-[800px]">
        {/* Eyebrow */}
        <p className="font-pixel text-xl sm:text-2xl text-muted-foreground tracking-widest">
          May Matching Week
        </p>

        {/* Main title — pixel font with glow */}
        <h1 className="font-pixel text-6xl sm:text-8xl lg:text-9xl display-glow leading-none tracking-wide">
          K·TECH CONNECT
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-foreground/80 font-light">
          {t("subtitle")}
        </p>

        {/* Sub-tagline */}
        <p className="font-pixel text-base sm:text-lg text-muted-foreground tracking-wider">
          1:1 INTERVIEW, MENTORING, IDEATHON
          <br />
          ALL IN ONE WEEK
        </p>
      </div>

      {/* Countdown */}
      <div className="mt-12 w-full max-w-[500px] relative z-10">
        <Countdown targetDate="2026-05-19T09:00:00+07:00" />
      </div>

      {/* Bottom bar — Date + Location + Register (poster style) */}
      <div className="absolute bottom-8 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-10">
        {/* Date & Location */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Date.</span>
            <span className="font-pixel text-2xl sm:text-3xl text-primary bg-primary/10 px-3 py-1 border border-primary/30 rounded-sm">
              MAY 19-20-21.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-pixel text-xl sm:text-2xl text-primary bg-primary/10 px-3 py-1 border border-primary/30 rounded-sm">
              COBI TOWER II
            </span>
            <span className="text-sm text-muted-foreground">Location.</span>
          </div>
        </div>

        {/* Register CTA */}
        <div className="text-right space-y-2">
          <p className="text-sm text-muted-foreground">You in?</p>
          <a
            href={`/${locale}/login`}
            className="btn-glow inline-block font-pixel text-xl sm:text-2xl px-6 py-3 rounded-sm text-primary-foreground uppercase tracking-wider transition-all"
          >
            REGISTER NOW
          </a>
        </div>
      </div>
    </section>
  );
}
