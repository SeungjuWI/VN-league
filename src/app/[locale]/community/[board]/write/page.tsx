"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ChevronLeft } from "lucide-react";

export default function WritePage({ params }: { params: Promise<{ board: string }> }) {
  const { board } = use(params);
  const t = useTranslations("community");
  const locale = useLocale();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ board, title, content }),
    });

    const data = await res.json();
    if (data.id) {
      router.push(`/${locale}/community/${board}/${data.id}`);
    } else {
      setError(data.error || "Failed to create post");
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <Link
            href={`/${locale}/community/${board}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> {t("back_list")}
          </Link>

          <h1 className="font-pixel text-2xl text-foreground mb-6">{t("write_title")}</h1>

          <form onSubmit={handleSubmit} className="glow-box rounded-sm p-6 space-y-4">
            <div>
              <label className="block font-mono text-xs text-muted-foreground uppercase mb-1">{t("col_title")}</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-secondary border border-border rounded-sm px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder={t("title_placeholder")}
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-muted-foreground uppercase mb-1">{t("col_content")}</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-y"
                placeholder={t("content_placeholder")}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex justify-end gap-3">
              <Link
                href={`/${locale}/community/${board}`}
                className="btn-ghost font-pixel text-sm px-6 py-2 rounded-sm text-muted-foreground hover:text-foreground"
              >
                {t("cancel")}
              </Link>
              <button
                type="submit"
                disabled={submitting || !title.trim() || !content.trim()}
                className="btn-glow font-pixel text-sm px-6 py-2 rounded-sm text-primary-foreground disabled:opacity-50"
              >
                {submitting ? "..." : t("submit")}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
