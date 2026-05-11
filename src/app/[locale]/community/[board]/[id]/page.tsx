"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ChevronLeft, Trash2, Send } from "lucide-react";

type Post = {
  id: string;
  board: string;
  author_id: string;
  author_name: string;
  title: string;
  content: string;
  pinned: boolean;
  created_at: string;
};

type Comment = {
  id: string;
  author_id: string;
  author_name: string;
  content: string;
  created_at: string;
};

export default function PostPage({
  params,
}: {
  params: Promise<{ board: string; id: string }>;
}) {
  const { board, id } = use(params);
  const t = useTranslations("community");
  const locale = useLocale();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user || null));
  }, []);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setPost(d.post || null);
        setComments(d.comments || []);
        setLoading(false);
      });
  }, [id]);

  async function handleDelete() {
    if (!confirm(t("confirm_delete"))) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.push(`/${locale}/community/${board}`);
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim() || sending) return;
    setSending(true);
    const res = await fetch(`/api/posts/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment.trim() }),
    });
    const data = await res.json();
    if (data.comment) {
      setComments((prev) => [...prev, data.comment]);
      setNewComment("");
    }
    setSending(false);
  }

  function formatDateTime(iso: string) {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-20 pb-24 px-6">
          <div className="max-w-[900px] mx-auto text-center text-muted-foreground py-20">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-20 pb-24 px-6">
          <div className="max-w-[900px] mx-auto text-center py-20">
            <p className="text-muted-foreground mb-4">{t("not_found")}</p>
            <Link href={`/${locale}/community/${board}`} className="text-primary hover:underline">{t("back_list")}</Link>
          </div>
        </main>
        <Footer />
      </>
    );
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

          {/* Post */}
          <article className="glow-box rounded-sm p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                {post.pinned && <span className="font-pixel text-xs text-primary mr-2">[PIN]</span>}
                <h1 className="font-pixel text-xl sm:text-2xl text-foreground inline">{post.title}</h1>
              </div>
              {user?.id === post.author_id && (
                <button onClick={handleDelete} className="text-muted-foreground hover:text-destructive p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-6">
              <span>{post.author_name}</span>
              <span>{formatDateTime(post.created_at)}</span>
            </div>
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</div>
          </article>

          {/* Comments */}
          <section>
            <h2 className="font-pixel text-lg text-foreground mb-4">
              {t("comments")} ({comments.length})
            </h2>

            <div className="space-y-3 mb-6">
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("no_comments")}</p>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="glow-box rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-primary">{c.author_name}</span>
                      <span className="text-[10px] text-muted-foreground">{formatDateTime(c.created_at)}</span>
                    </div>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{c.content}</p>
                  </div>
                ))
              )}
            </div>

            {user ? (
              <form onSubmit={handleComment} className="flex gap-2">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={t("comment_placeholder")}
                  className="flex-1 bg-secondary border border-border rounded-sm px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <button
                  type="submit"
                  disabled={sending || !newComment.trim()}
                  className="btn-glow font-pixel text-sm px-4 py-2 rounded-sm text-primary-foreground disabled:opacity-50 inline-flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <Link href={`/${locale}/login`} className="text-sm text-primary hover:underline">
                {t("login_to_comment")}
              </Link>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
