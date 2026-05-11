import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET — load my submission
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("ktc_simple_submissions")
    .select("*")
    .eq("user_id", session.sub)
    .single();

  return NextResponse.json({ submission: data || null });
}

// POST — save or update submission
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { team_name, members, deck_url, demo_url, submit } = body;

  // Check if submission exists
  const { data: existing } = await supabase
    .from("ktc_simple_submissions")
    .select("id")
    .eq("user_id", session.sub)
    .single();

  const payload = {
    user_id: session.sub,
    team_name,
    members,
    deck_url,
    demo_url,
    status: submit ? "submitted" : "draft",
    submitted_at: submit ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    const { error } = await supabase
      .from("ktc_simple_submissions")
      .update(payload)
      .eq("id", existing.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabase
      .from("ktc_simple_submissions")
      .insert(payload);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
