"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

const REACTIONS = [
  { key: "helpful", emoji: "👍", label: "Helpful" },
  { key: "insightful", emoji: "🔥", label: "Insightful" },
  { key: "legal", emoji: "⚖️", label: "Legal Point" },
  { key: "funny", emoji: "😂", label: "Funny" }
];

export function CommentReactions({
  commentId,
  currentUserId,
  initialCounts = {}
}: {
  commentId: string;
  currentUserId?: string | null;
  initialCounts?: Record<string, number>;
}) {
  const supabase = createClient();

  const [counts, setCounts] = useState<Record<string, number>>(initialCounts);
  const [loading, setLoading] = useState<string | null>(null);

  async function react(reaction: string) {
    if (!currentUserId || loading) return;

    setLoading(reaction);

    const { data: existing } = await supabase
      .from("comment_reactions")
      .select("id")
      .eq("comment_id", commentId)
      .eq("user_id", currentUserId)
      .eq("reaction", reaction)
      .maybeSingle();

    if (existing?.id) {
      await supabase
        .from("comment_reactions")
        .delete()
        .eq("id", existing.id);

      setCounts((current) => ({
        ...current,
        [reaction]: Math.max((current[reaction] ?? 1) - 1, 0)
      }));
    } else {
      await supabase.from("comment_reactions").insert({
        comment_id: commentId,
        user_id: currentUserId,
        reaction
      });

      setCounts((current) => ({
        ...current,
        [reaction]: (current[reaction] ?? 0) + 1
      }));
    }

    setLoading(null);
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {REACTIONS.map((reaction) => (
        <button
          key={reaction.key}
          type="button"
          onClick={() => react(reaction.key)}
          className="inline-flex items-center gap-1 rounded-full border bg-white px-2 py-1 text-xs transition hover:bg-slate-100"
        >
          <span>{reaction.emoji}</span>
          <span>{counts[reaction.key] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
