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

  if (!mounted) {
    return <CountdownDisplay days="--" hours="--" minutes="--" seconds="--" />;
  }

  return (
    <CountdownDisplay
      days={String(time.days).padStart(2, "0")}
      hours={String(time.hours).padStart(2, "0")}
      minutes={String(time.minutes).padStart(2, "0")}
      seconds={String(time.seconds).padStart(2, "0")}
    />
  );
}

function CountdownDisplay({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}) {
  const t = useTranslations("hero");

  return (
    <div className="flex items-center gap-3">
      <TimeUnit value={days} label={t("countdown_days")} />
      <span className="text-2xl font-mono text-muted-foreground/40">:</span>
      <TimeUnit value={hours} label={t("countdown_hours")} />
      <span className="text-2xl font-mono text-muted-foreground/40">:</span>
      <TimeUnit value={minutes} label={t("countdown_minutes")} />
      <span className="text-2xl font-mono text-muted-foreground/40">:</span>
      <TimeUnit value={seconds} label={t("countdown_seconds")} />
    </div>
  );
}

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-mono font-bold text-foreground tracking-tight">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-[0.06em] text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}
