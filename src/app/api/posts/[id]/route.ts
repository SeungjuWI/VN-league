import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET — single post with comments
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [postRes, commentsRes] = await Promise.all([
    supabase.from("ktc_posts").select("*").eq("id", id).single(),
    supabase
      .from("ktc_comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: true }),
  ]);

  if (postRes.error) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  return NextResponse.json({ post: postRes.data, comments: commentsRes.data || [] });
}

// DELETE — delete own post
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  // Verify ownership
  const { data: post } = await supabase
    .from("ktc_posts")
    .select("author_id")
    .eq("id", id)
    .single();

  if (!post || post.author_id !== session.sub) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error } = await supabase.from("ktc_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
