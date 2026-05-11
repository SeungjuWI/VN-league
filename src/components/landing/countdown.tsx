"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface CountdownProps {
  targetDate: string;
}

function calcTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ targetDate }: CountdownProps) {
  const t = useTranslations("hero");
  const [time, setTime] = useState(calcTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTime(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { value: mounted ? time.days : 0, label: t("countdown_days") },
    { value: mounted ? time.hours : 0, label: t("countdown_hours") },
    { value: mounted ? time.minutes : 0, label: t("countdown_minutes") },
    { value: mounted ? time.seconds : 0, label: t("countdown_seconds") },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {units.map((unit, i) => (
        <div key={unit.label} className="text-center">
          <div className="glow-box rounded-sm py-3 animate-border-glow">
            <span className="font-pixel text-4xl sm:text-5xl text-primary tabular-nums display-glow">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <p className="font-mono text-[10px] text-muted-foreground mt-2 uppercase tracking-[0.15em]">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}
