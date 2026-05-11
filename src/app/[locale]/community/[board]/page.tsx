"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

type Post = {
  id: string;
  title: string;
  author_name: string;
  pinned: boolean;
  created_at: string;
};

const VALID_BOARDS = ["notice", "qa", "free"];

export default function BoardPage({ params }: { params: Promise<{ board: string }> }) {
  const { board } = use(params);
  const t = useTranslations("community");
  const locale = useLocale();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const limit = 20;

  if (!VALID_BOARDS.includes(board)) {
    router.replace(`/${locale}/community`);
    return null;
  }

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user || null));
  }, []);

  useEffect(() => {
    fetch(`/api/posts?board=${board}&page=${page}`)
      .then((r) => r.json())
      .then((d) => {
        setPosts(d.posts || []);
        setTotal(d.total || 0);
      });
  }, [board, page]);

  const totalPages = Math.ceil(total / limit);

  function formatDate(iso: string) {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <Link href={`/${locale}/community`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ChevronLeft className="w-4 h-4" /> {t("back_community")}
          </Link>

          <div className="flex items-center justify-between mb-6">
            <h1 className="font-pixel text-2xl sm:text-3xl text-foreground">{t(`board_${board}`)}</h1>
            {user && (board !== "notice" || true) && (
              <Link
                href={`/${locale}/community/${board}/write`}
                className="btn-glow font-pixel text-sm px-4 py-2 rounded-sm text-primary-foreground inline-flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> {t("write")}
              </Link>
            )}
          </div>

          <div className="glow-box rounded-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_120px_100px] font-mono text-[10px] text-muted-foreground uppercase tracking-[0.12em] border-b border-border px-4 py-3">
              <div>{t("col_title")}</div>
              <div className="text-center">{t("col_author")}</div>
              <div className="text-right">{t("col_date")}</div>
            </div>

            {posts.length === 0 ? (
              <div className="px-4 py-12 text-center text-sm text-muted-foreground">{t("no_posts")}</div>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/community/${board}/${post.id}`}
                  className="grid grid-cols-[1fr_120px_100px] px-4 py-3 border-b border-border/50 last:border-0 hover:bg-primary/5 transition-colors items-center"
                >
                  <div className="text-sm truncate pr-4">
                    {post.pinned && <span className="font-pixel text-primary mr-1">[PIN]</span>}
                    <span className="text-foreground">{post.title}</span>
                  </div>
                  <div className="text-xs text-muted-foreground text-center truncate">{post.author_name}</div>
                  <div className="text-xs text-muted-foreground text-right">{formatDate(post.created_at)}</div>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
