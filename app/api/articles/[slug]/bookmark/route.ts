import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get("articleId");

  if (!articleId) {
    return NextResponse.json({ bookmarked: false }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ bookmarked: false });
  }

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("article_id", articleId)
    .eq("user_id", user.id)
    .maybeSingle();

  return NextResponse.json({ bookmarked: Boolean(existing) });
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { articleId } = await request.json();

  if (!articleId) {
    return NextResponse.json({ error: "Missing articleId" }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized", loginUrl: `/login?next=/articles/${(await params).slug}` },
      { status: 401 }
    );
  }

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("article_id", articleId)
    .eq("user_id", user.id)
    .maybeSingle();

  let bookmarked = false;

  if (existing) {
    await supabase.from("bookmarks").delete().eq("id", existing.id);
    bookmarked = false;
  } else {
    await supabase.from("bookmarks").insert({ article_id: articleId, user_id: user.id });
    bookmarked = true;
  }

  return NextResponse.json({ bookmarked });
}
