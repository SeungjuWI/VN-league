"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { MessageSquare, Megaphone, Users } from "lucide-react";

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

export default function CommunityPage() {
  const t = useTranslations("community");
  const locale = useLocale();
  const [previews, setPreviews] = useState<Record<string, PostPreview[]>>({});

  useEffect(() => {
    BOARDS.forEach(({ key }) => {
      fetch(`/api/posts?board=${key}&page=1`)
        .then((r) => r.json())
        .then((d) => setPreviews((prev) => ({ ...prev, [key]: (d.posts || []).slice(0, 5) })));
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-pixel text-lg text-primary display-glow mb-2">[COMMUNITY]</p>
          <h1 className="font-pixel text-3xl sm:text-4xl text-foreground mb-10">{t("title")}</h1>

          <div className="grid gap-6 md:grid-cols-3">
            {BOARDS.map(({ key, icon: Icon }) => (
              <div key={key} className="glow-box rounded-sm p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                  <h2 className="font-pixel text-xl text-foreground">{t(`board_${key}`)}</h2>
                </div>

                <div className="flex-1 space-y-2 mb-4 min-h-[140px]">
                  {(previews[key] || []).length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t("no_posts")}</p>
                  ) : (
                    previews[key].map((post) => (
                      <Link
                        key={post.id}
                        href={`/${locale}/community/${key}/${post.id}`}
                        className="block text-sm text-foreground hover:text-primary transition-colors truncate"
                      >
                        {post.pinned && <span className="text-primary font-pixel mr-1">[PIN]</span>}
                        {post.title}
                      </Link>
                    ))
                  )}
                </div>

                <Link
                  href={`/${locale}/community/${key}`}
                  className="btn-ghost font-pixel text-sm text-center py-2 rounded-sm hover:text-foreground transition-all"
                >
                  {t("view_more")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
