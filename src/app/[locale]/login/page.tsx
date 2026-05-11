"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const t = useTranslations("login");
  const locale = useLocale();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup" && password !== passwordConfirm) {
      setError(t("password_mismatch"));
      setLoading(false);
      return;
    }

    const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
    const body = mode === "signup"
      ? { email, password, full_name: fullName, phone, organization, locale }
      : { email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else if (mode === "signup") {
      setSignupDone(true);
    } else {
      router.push(`/${locale}/dashboard`);
    }

    setLoading(false);
  };

  if (signupDone) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center space-y-6">
          <h1 className="font-pixel text-3xl text-primary display-glow">K·TECH CONNECT</h1>
          <div className="glow-box rounded-sm p-8 space-y-4">
            <p className="font-pixel text-xl text-foreground">{t("signup_done_title")}</p>
            <p className="text-sm text-muted-foreground">{t("signup_done_desc")}</p>
            <button
              onClick={() => { setSignupDone(false); setMode("login"); setPassword(""); setPasswordConfirm(""); }}
              className="btn-glow font-pixel text-base px-8 py-2.5 rounded-sm text-primary-foreground uppercase tracking-wider transition-all"
            >
              {t("btn_login")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none transition-colors";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="font-pixel text-3xl text-primary display-glow tracking-wider">
            K·TECH CONNECT
          </h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="glow-box rounded-sm p-8 space-y-6">
          <div className="flex border border-border rounded-sm overflow-hidden">
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 font-pixel text-sm py-2 transition-colors ${
                mode === "login" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("tab_login")}
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); }}
              className={`flex-1 font-pixel text-sm py-2 transition-colors ${
                mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("tab_signup")}
            </button>
          </div>

          <p className="text-sm text-muted-foreground text-center">{t("description")}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{t("full_name")} *</label>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} autoComplete="off" placeholder="Nguyen Van A" />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{t("phone")} *</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} autoComplete="off" placeholder="0912 345 678" />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{t("organization")}</label>
                  <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} className={inputClass} autoComplete="off" placeholder={t("org_placeholder")} />
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Email *</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} autoComplete="off" placeholder="you@example.com" />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{t("password")} *</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} autoComplete="off" placeholder="••••••••" />
              {mode === "signup" && (
                <p className="text-[10px] text-muted-foreground">{t("password_hint")}</p>
              )}
            </div>

            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{t("password_confirm")} *</label>
                <input type="password" required minLength={6} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className={inputClass} autoComplete="off" placeholder="••••••••" />
              </div>
            )}

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-glow font-pixel text-base py-2.5 rounded-sm text-primary-foreground uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {loading ? "..." : mode === "login" ? t("btn_login") : t("btn_signup")}
            </button>
          </form>
        </div>

        <div className="text-center">
          <a href={`/${locale}`} className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
            ← {t("back_home")}
          </a>
        </div>
      </div>
    </div>
  );
}
