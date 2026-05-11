import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signToken, sessionCookie } from "@/lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
  }

  const { data: user, error } = await supabase
    .from("ktc_users")
    .select("id, email, password_hash")
    .eq("email", email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = signToken(user.id, user.email);
  const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
  res.cookies.set(sessionCookie(token));
  return res;
}
