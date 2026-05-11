"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Save, Send, ArrowLeft, ExternalLink, Globe } from "lucide-react";

type User = { id: string; email: string };
type FormData = {
  team_name: string;
  members: string;
  deck_url: string;
  demo_url: string;
};

const empty: FormData = { team_name: "", members: "", deck_url: "", demo_url: "" };

export default function SubmitPage() {
  const t = useTranslations("submit");
  const locale = useLocale();
  const router = useRouter();
  const otherLocale = locale === "vi" ? "ko" : "vi";

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormData>(empty);
  const [status, setStatus] = useState<"draft" | "submitted">("draft");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) { router.push(`/${locale}/login`); return; }
        setUser(data.user);
        // Load existing submission
        fetch("/api/submissions")
          .then((r) => r.json())
          .then((d) => {
            if (d.submission) {
              setForm({
                team_name: d.submission.team_name || "",
                members: d.submission.members || "",
                deck_url: d.submission.deck_url || "",
                demo_url: d.submission.demo_url || "",
              });
              setStatus(d.submission.status || "draft");
            }
            setLoading(false);
          });
      });
  }, []);

  async function handleSave() {
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, submit: false }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  async function handleSubmit() {
    if (!form.team_name || !form.members || !form.deck_url) return;
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, submit: true }),
    });
    if (res.ok) {
      setStatus("submitted");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white"><p className="text-gray-400">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <div className="border-b border-gray-200">
        <div className="max-w-[640px] mx-auto px-6 h-14 flex items-center justify-between">
          <a href={`/${locale}/dashboard`} className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> {t("back")}
          </a>
          <div className="flex items-center gap-3">
            <a href={`/${otherLocale}/submit`} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              {otherLocale === "ko" ? "한국어" : "Tiếng Việt"}
            </a>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              status === "submitted" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
            }`}>
              {status === "submitted" ? t("status_submitted") : t("status_draft")}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-gray-500 mt-1">{t("desc")}</p>
        </div>

        {/* Team */}
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <span className="text-[#9D4EDD] text-sm">01</span> Team
          </h3>
          <div className="border border-gray-200 rounded-xl p-5 space-y-4">
            <Field label={t("field_team_name")} required>
              <input type="text" value={form.team_name} onChange={update("team_name")} autoComplete="off" placeholder="Team Alpha"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-[#9D4EDD] focus:ring-1 focus:ring-[#9D4EDD]/20 focus:outline-none transition-colors placeholder:text-gray-300" />
            </Field>
            <Field label={t("field_members")} required>
              <textarea value={form.members} onChange={update("members")} rows={3} placeholder={"Nguyen Van A — Team Lead\nTran Thi B — Designer"}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-[#9D4EDD] focus:ring-1 focus:ring-[#9D4EDD]/20 focus:outline-none transition-colors resize-none placeholder:text-gray-300" />
            </Field>
          </div>
        </div>

        {/* Files */}
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <span className="text-[#9D4EDD] text-sm">02</span> Files
          </h3>
          <div className="border border-gray-200 rounded-xl p-5 space-y-4">
            <Field label={t("field_deck_url")} required>
              <UrlInput value={form.deck_url} onChange={update("deck_url")} placeholder="https://drive.google.com/..." />
            </Field>
            <Field label={t("field_demo_url")}>
              <UrlInput value={form.demo_url} onChange={update("demo_url")} placeholder="https://youtube.com/..." />
            </Field>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button onClick={handleSave} disabled={status === "submitted"}
            className="text-sm font-medium px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-40">
            <Save className="w-4 h-4" /> {t("btn_save")}
          </button>
          <button onClick={handleSubmit} disabled={status === "submitted"}
            className="bg-[#9D4EDD] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#8B3FC7] transition-colors flex items-center gap-2 disabled:opacity-40">
            <Send className="w-4 h-4" /> {t("btn_submit")}
          </button>
          {saved && <span className="text-sm text-green-600 font-medium">{t("saved")}</span>}
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-gray-700">{label} {required && <span className="text-[#9D4EDD]">*</span>}</label>
      {children}
    </div>
  );
}

function UrlInput({ value, onChange, placeholder }: {
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string;
}) {
  return (
    <div className="flex gap-2">
      <input type="url" value={value} onChange={onChange} placeholder={placeholder} autoComplete="off"
        className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-[#9D4EDD] focus:ring-1 focus:ring-[#9D4EDD]/20 focus:outline-none transition-colors placeholder:text-gray-300" />
      {value && (
        <a href={value} target="_blank" rel="noopener noreferrer"
          className="px-3 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </a>
      )}
    </div>
  );
}
