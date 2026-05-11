"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";

export function VenueSection() {
  const t = useTranslations("venue");
  const areas = t.raw("areas") as { area: string; purpose: string }[];

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-pixel text-lg text-primary display-glow mb-2">[04_VENUE]</p>
        <h2 className="font-pixel text-3xl sm:text-4xl text-foreground mb-8">{t("title")}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="glow-box rounded-sm p-6 space-y-3">
              <h3 className="font-pixel text-xl text-primary">{t("name")}</h3>
              <p className="text-sm text-muted-foreground">{t("address")}</p>
              <a
                href="https://maps.app.goo.gl/YQuNrauPg6fKsqqt5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:text-[#FF6FD8] transition-colors uppercase tracking-wider"
              >
                {t("map_link")} <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {areas.map((a) => (
              <div key={a.area} className="glow-box rounded-sm p-4 flex items-center gap-3 animate-border-glow">
                <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(199,125,255,0.6)]" />
                <div>
                  <p className="font-pixel text-sm text-foreground">{a.area}</p>
                  <p className="text-xs text-muted-foreground">{a.purpose}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glow-box rounded-sm overflow-hidden min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0!2d106.7!3d10.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQzJzQ4LjAiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1svi!2s!4v1"
              className="w-full h-full min-h-[300px] border-0 opacity-60 invert hue-rotate-[270deg]"
              allowFullScreen
              loading="lazy"
              title="COBI Work"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
