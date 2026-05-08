import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

async function getLikesCount(supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>, articleId: string) {
  const { count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("article_id", articleId);

  return count ?? 0;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get("articleId");

  if (!articleId) {
    return NextResponse.json({ liked: false, likesCount: 0 }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const likesCount = await getLikesCount(supabase, articleId);

  if (!user) {
    return NextResponse.json({ liked: false, likesCount });
  }

  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("article_id", articleId)
    .eq("user_id", user.id)
    .maybeSingle();

  return NextResponse.json({ liked: Boolean(existing), likesCount });
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const { articleId } = await request.json();

  if (!articleId) {
    return NextResponse.json({ error: "Missing articleId" }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized", loginUrl: `/login?next=/articles/${params.slug}` }, { status: 401 });
  }

  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("article_id", articleId)
    .eq("user_id", user.id)
    .maybeSingle();

  let liked = false;

  if (existing) {
    await supabase.from("likes").delete().eq("id", existing.id);
    liked = false;
  } else {
    await supabase.from("likes").insert({ article_id: articleId, user_id: user.id });
    liked = true;
  }

  const likesCount = await getLikesCount(supabase, articleId);

  return NextResponse.json({ liked, likesCount });
}
