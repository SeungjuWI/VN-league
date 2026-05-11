"use client";

import { useTranslations } from "next-intl";
import { MapPin, ExternalLink } from "lucide-react";

export function VenueSection() {
  const t = useTranslations("venue");
  const areas = t.raw("areas") as { area: string; purpose: string }[];

  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3">
          {t("eyebrow")}
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8">{t("title")}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Venue info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {t("name")}
              </h3>
              <p className="text-sm text-muted-foreground">{t("address")}</p>
              <a
                href="https://maps.app.goo.gl/YQuNrauPg6fKsqqt5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-2"
              >
                {t("map_link")}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-3">
              {areas.map((a) => (
                <div key={a.area} className="flex items-start gap-3 bg-background border border-border rounded-xl p-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{a.area}</p>
                    <p className="text-xs text-muted-foreground">{a.purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map embed placeholder */}
          <div className="bg-background border border-border rounded-2xl overflow-hidden min-h-[300px] flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0!2d106.7!3d10.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQzJzQ4LjAiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1svi!2s!4v1"
              className="w-full h-full min-h-[300px] border-0 opacity-70"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="COBI Work"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
