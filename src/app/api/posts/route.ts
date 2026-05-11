import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET — list posts by board
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const board = searchParams.get("board");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;
  const offset = (page - 1) * limit;

  if (!board || !["notice", "qa", "free"].includes(board)) {
    return NextResponse.json({ error: "Invalid board" }, { status: 400 });
  }

  const { data, error, count } = await supabase
    .from("ktc_posts")
    .select("id, board, author_id, author_name, title, pinned, created_at", { count: "exact" })
    .eq("board", board)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ posts: data, total: count, page, limit });
}

// POST — create a new post
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { board, title, content } = body;

  if (!board || !["notice", "qa", "free"].includes(board)) {
    return NextResponse.json({ error: "Invalid board" }, { status: 400 });
  }
  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "Title and content required" }, { status: 400 });
  }

  // Get author name
  const { data: user } = await supabase
    .from("ktc_users")
    .select("full_name")
    .eq("id", session.sub)
    .single();

  const { data, error } = await supabase
    .from("ktc_posts")
    .insert({
      board,
      author_id: session.sub,
      author_name: user?.full_name || session.email,
      title: title.trim(),
      content: content.trim(),
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ id: data.id });
}
