import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signToken, sessionCookie } from "@/lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { email, password, full_name, phone, organization, locale } = await req.json();

  if (!email || !password || !full_name || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Check if email already exists
  const { data: existing } = await supabase
    .from("ktc_users")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const { data: user, error } = await supabase
    .from("ktc_users")
    .insert({
      email,
      password_hash,
      full_name,
      phone,
      organization: organization || null,
      preferred_locale: locale || "vi",
    })
    .select("id, email")
    .single();

  if (error || !user) {
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }

  const token = signToken(user.id, user.email);
  const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
  res.cookies.set(sessionCookie(token));
  return res;
}
