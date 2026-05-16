"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

import { revalidatePath } from "next/cache";

export type DebateSide = "agree" | "disagree";

export type DebateEntry = {
  id: string;
  article_id: string;
  user_id: string;
  side: DebateSide;
  argument: string | null;
  created_at: string;
  updated_at: string;
};

export async function getArticleDebateEntries(articleId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("article_debate_entries")
    .select("id, article_id, user_id, side, argument, created_at, updated_at")
    .eq("article_id", articleId)
    .order("updated_at", { ascending: false });

  if (error) {
    return {
      entries: [] as DebateEntry[],
      error: error.message,
    };
  }

  return {
    entries: (data ?? []) as DebateEntry[],
    error: null,
  };
}

export async function upsertArticleDebateEntry(input: {
  articleId: string;
  slug: string;
  side: DebateSide;
  argument?: string;
}) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      ok: false,
      error: "You must sign in before joining the debate.",
    };
  }

  const argument = input.argument?.trim() || null;

  const { error } = await supabase
    .from("article_debate_entries")
    .upsert(
      {
        article_id: input.articleId,
        user_id: user.id,
        side: input.side,
        argument,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "article_id,user_id",
      }
    );

  if (error) {
    return {
      ok: false,
      error: error.message,
    };
  }

  revalidatePath(`/articles/${input.slug}`);

  return {
    ok: true,
    error: null,
  };
}
