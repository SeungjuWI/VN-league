import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// POST — add comment
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { content } = body;

  if (!content?.trim()) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  // Get author name
  const { data: user } = await supabase
    .from("ktc_users")
    .select("full_name")
    .eq("id", session.sub)
    .single();

  const { data, error } = await supabase
    .from("ktc_comments")
    .insert({
      post_id: id,
      author_id: session.sub,
      author_name: user?.full_name || session.email,
      content: content.trim(),
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ comment: data });
}
