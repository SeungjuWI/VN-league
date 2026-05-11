"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { LogOut, Send, Eye, AlertCircle, CheckCircle, Globe } from "lucide-react";

type User = { id: string; email: string };
type Criterion = { name: string; weight: number; desc: string };
type ScheduleItem = { date: string; title: string; desc: string };

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const router = useRouter();
  const otherLocale = locale === "vi" ? "ko" : "vi";

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) { router.push(`/${locale}/login`); return; }
        setUser(data.user);
        fetch("/api/submissions")
          .then((r) => r.json())
          .then((d) => {
            if (d.submission?.status === "submitted") setHasSubmitted(true);
            setLoading(false);
          });
      });
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`/${locale}`);
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white"><p className="text-gray-400">Loading...</p></div>;
  }

  const criteria = t.raw("criteria") as Criterion[];
  const schedule = t.raw("schedule") as ScheduleItem[];
  const rules = t.raw("rules") as string[];
  const whyPoints = [t("why_1"), t("why_2"), t("why_3"), t("why_4")];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <div className="border-b border-gray-200">
        <div className="max-w-[960px] mx-auto px-6 h-14 flex items-center justify-between">
          <a href={`/${locale}`} className="text-sm font-bold">K-Tech Connect</a>
          <div className="flex items-center gap-4">
            <a href={`/${otherLocale}/dashboard`} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              {otherLocale === "ko" ? "한국어" : "Tiếng Việt"}
            </a>
            <span className="text-xs text-gray-500">{user?.email}</span>
            <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-6 py-10 space-y-12">

        {/* Round status */}
        <div className="flex items-center gap-2 flex-wrap">
          <Pill active>{t("round1_label")} <Live /></Pill>
          <Pill>{t("round2_label")}</Pill>
          <Pill>{t("round3_label")}</Pill>
        </div>

        {/* Countdown */}
        <div className="bg-gray-900 text-white rounded-2xl p-8">
          <p className="text-sm text-gray-400 mb-4">{t("deadline_label")}: {t("deadline_date")}</p>
          <DashboardCountdown targetDate="2026-05-16T12:00:00+07:00" />
        </div>

        {/* Title */}
        <div>
          <p className="text-sm text-[#9D4EDD] font-bold mb-2">KTC AI CHALLENGE 2026</p>
          <h1 className="text-4xl font-bold leading-tight">
            K-Tech Connect <span className="text-[#9D4EDD]">Ideathon.</span>
          </h1>
          <p className="text-gray-500 mt-3 text-lg">{t("ideathon_slogan")}</p>
          <p className="text-gray-500 mt-2">{t("ideathon_desc")}</p>
        </div>

        {/* Submit CTA */}
        <div className={`rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border ${
          hasSubmitted ? "border-green-200 bg-green-50" : "border-[#C77DFF]/30 bg-[#C77DFF]/5"
        }`}>
          <div className="flex items-center gap-3">
            {hasSubmitted ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-[#C77DFF]" />}
            <div>
              <p className="font-bold text-sm">{hasSubmitted ? t("submitted") : t("not_submitted")}</p>
              <p className="text-xs text-gray-500">{t("deadline_label")}: {t("deadline_date")}</p>
            </div>
          </div>
          <a href={`/${locale}/submit`}
            className="bg-[#9D4EDD] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#8B3FC7] transition-colors flex items-center gap-2 shrink-0">
            {hasSubmitted ? <><Eye className="w-4 h-4" /> {t("btn_view")}</> : <><Send className="w-4 h-4" /> {t("btn_submit")}</>}
          </a>
        </div>

        {/* Why join */}
        <Section eyebrow="WHY" title={t("why_title")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyPoints.map((p, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5 flex gap-3">
                <span className="text-[#9D4EDD] font-bold text-sm shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm text-gray-600">{p}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Topic */}
        <Section eyebrow="TOPIC" title={t("topic_title")}>
          <p className="text-gray-600 leading-relaxed">{t("topic_desc")}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border border-gray-200 rounded-xl p-5">
              <p className="font-bold text-sm mb-1">{t("topic_recruitment")}</p>
              <p className="text-xs text-gray-500">{t("topic_recruitment_desc")}</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-5">
              <p className="font-bold text-sm mb-1">{t("topic_remote")}</p>
              <p className="text-xs text-gray-500">{t("topic_remote_desc")}</p>
            </div>
          </div>
        </Section>

        {/* Schedule */}
        <Section eyebrow="SCHEDULE" title={t("schedule_title")}>
          <div className="space-y-0">
            {schedule.map((s, i) => (
              <div key={i} className="flex gap-4 pb-6 last:pb-0 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-[#9D4EDD]" : "bg-gray-300"}`} />
                  {i < schedule.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                </div>
                <div className="pb-2">
                  <p className="text-xs text-[#9D4EDD] font-bold font-mono">{s.date}</p>
                  <p className="font-bold text-sm mt-0.5">{s.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Judging criteria — donut chart + legend */}
        <Section eyebrow="JUDGING" title={t("criteria_title")}>
          <JudgingChart criteria={criteria} totalLabel={t("criteria_total")} />
          <div className="mt-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="font-bold text-sm mb-2">💡 {t("bonus_title")}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{t("bonus_desc")}</p>
            </div>
          </div>
        </Section>

        {/* Rules */}
        <Section eyebrow="RULES" title={t("rules_title")}>
          <div className="space-y-2">
            {rules.map((rule, i) => (
              <div key={i} className="flex gap-3 py-2 border-b border-gray-100 last:border-0">
                <span className="text-[#9D4EDD] font-bold text-xs shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm text-gray-600">{rule}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Deliverables */}
        <Section eyebrow="SUBMIT" title={t("deliverables_title")}>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Format", t("deliver_format")],
                  ["Language", t("deliver_language")],
                  ["Upload", t("deliver_upload")],
                  ["Optional", t("deliver_optional")],
                  ["File name", t("deliver_filename")],
                ].map(([label, val]) => (
                  <tr key={label} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 font-medium bg-gray-50 w-1/3 text-gray-700">{label}</td>
                    <td className="px-4 py-3 text-gray-600">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Final Pitch rules */}
        <Section eyebrow="FINAL PITCH" title={t("pitch_rules_title")}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Pitch", value: t("pitch_time") },
              { label: "Q&A", value: t("pitch_qa") },
              { label: "Language", value: t("pitch_lang") },
              { label: "Dress", value: t("pitch_dress") },
            ].map((item) => (
              <div key={item.label} className="border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="font-bold text-sm mt-1">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">{t("pitch_note")}</p>
        </Section>

      </div>
    </div>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-[#9D4EDD] font-bold tracking-wider mb-1">{eyebrow}</p>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      {children}
    </div>
  );
}

function Pill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
      active ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"
    }`}>
      {children}
    </div>
  );
}

function Live() {
  return <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full font-bold">LIVE</span>;
}

function JudgingChart({ criteria, totalLabel }: { criteria: Criterion[]; totalLabel: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const colors = ["#7C3AED", "#9D4EDD", "#C77DFF", "#D4A5FF", "#E9D5FF", "#F3E8FF"];
  const R = 70;
  const CIRC = 2 * Math.PI * R;

  let offsets: number[] = [];
  let acc = 0;
  criteria.forEach((c) => { offsets.push(acc); acc += c.weight; });

  const centerName = hovered !== null ? criteria[hovered].name : totalLabel;
  const centerValue = hovered !== null ? `${criteria[hovered].weight}%` : "100%";

  return (
    <div className="flex flex-col md:flex-row gap-10 items-center">
      <div className="relative shrink-0">
        <svg width="220" height="220" viewBox="0 0 220 220">
          {criteria.map((c, i) => {
            const pct = c.weight / 100;
            const dash = pct * CIRC;
            const gap = CIRC - dash;
            const off = -(offsets[i] / 100) * CIRC;
            const isActive = hovered === i;
            return (
              <circle
                key={c.name}
                cx="110" cy="110" r={R}
                fill="none"
                stroke={colors[i]}
                strokeWidth={isActive ? 48 : 40}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={off}
                transform="rotate(-90 110 110)"
                style={{ transition: "stroke-width 0.2s ease" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs text-gray-400 transition-all">{centerName}</p>
          <p className="text-3xl font-bold transition-all">{centerValue}</p>
        </div>
      </div>

      <div className="flex-1 space-y-2.5 w-full">
        {criteria.map((c, i) => (
          <div
            key={c.name}
            className={`flex items-center justify-between py-1.5 px-2 rounded-md transition-colors cursor-pointer ${
              hovered === i ? "bg-gray-100" : ""
            }`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: colors[i] }} />
              <span className="text-sm font-medium">{c.name}</span>
            </div>
            <span className={`text-sm font-bold transition-colors ${
              hovered === i ? "text-[#7C3AED]" : "text-[#9D4EDD]"
            }`}>{c.weight}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardCountdown({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTime(calc());
    const interval = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { v: time.days, l: "DAYS" }, { v: time.hours, l: "HOURS" },
    { v: time.minutes, l: "MINUTES" }, { v: time.seconds, l: "SECONDS" },
  ];

  return (
    <div className="flex items-center gap-3">
      {units.map((u, i) => (
        <div key={u.l} className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold font-mono tabular-nums">
              {mounted ? String(u.v).padStart(2, "0") : "--"}
            </div>
            <div className="text-[10px] text-gray-500 mt-1 tracking-wider">{u.l}</div>
          </div>
          {i < units.length - 1 && <span className="text-3xl text-gray-600 font-light">:</span>}
        </div>
      ))}
    </div>
  );
}
