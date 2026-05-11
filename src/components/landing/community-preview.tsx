"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageSquare, Megaphone, Users, ArrowRight } from "lucide-react";

type PostPreview = {
  id: string;
  title: string;
  author_name: string;
  created_at: string;
  pinned: boolean;
};

const BOARDS = [
  { key: "notice", icon: Megaphone },
  { key: "qa", icon: MessageSquare },
  { key: "free", icon: Users },
] as const;

export function CommunityPreview() {
  const t = useTranslations("community");
  const locale = useLocale();
  const [previews, setPreviews] = useState<Record<string, PostPreview[]>>({});

  useEffect(() => {
    BOARDS.forEach(({ key }) => {
      fetch(`/api/posts?board=${key}&page=1`)
        .then((r) => r.json())
        .then((d) => setPreviews((prev) => ({ ...prev, [key]: (d.posts || []).slice(0, 3) })));
    });
  }, []);

  function formatDate(iso: string) {
    const d = new Date(iso);
    return `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-pixel text-lg text-primary display-glow mb-2">[COMMUNITY]</p>
            <h2 className="font-pixel text-3xl sm:text-4xl text-foreground">{t("title")}</h2>
          </div>
          <Link
            href={`/${locale}/community`}
            className="hidden sm:inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            {t("view_more")} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {BOARDS.map(({ key, icon: Icon }) => (
            <div key={key} className="glow-box rounded-sm p-5 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <h3 className="font-pixel text-lg text-foreground">{t(`board_${key}`)}</h3>
                </div>
                <Link
                  href={`/${locale}/community/${key}`}
                  className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors uppercase"
                >
                  {t("view_more")}
                </Link>
              </div>

              <div className="flex-1 space-y-2 min-h-[80px]">
                {(previews[key] || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("no_posts")}</p>
                ) : (
                  previews[key].map((post) => (
                    <Link
                      key={post.id}
                      href={`/${locale}/community/${key}/${post.id}`}
                      className="flex items-center justify-between gap-2 group"
                    >
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors truncate">
                        {post.pinned && <span className="font-pixel text-primary mr-1">[PIN]</span>}
                        {post.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{formatDate(post.created_at)}</span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/community`}
          className="sm:hidden flex items-center justify-center gap-1 mt-6 font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
        >
          {t("view_more")} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
