"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireProfile } from "@/lib/auth";
import { formString } from "@/lib/form-data";
import type { ActionState } from "@/lib/form-state";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function createDiscussionAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const { user } = await requireProfile("/discussions");

  const title = formString(formData, "title").trim();
  const body = formString(formData, "body").trim();

  if (title.length < 5 || body.length < 10) {
    return { status: "error", message: "Please write a clear title and discussion text." };
  }

  const supabase = await createServerSupabaseClient();
  const slug = `${slugify(title)}-${crypto.randomUUID().slice(0, 8)}`;

  const { error } = await supabase.from("discussion_threads").insert({
    title,
    body,
    slug,
    author_id: user.id
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/discussions");
  redirect(`/discussions/${slug}`);
}

export async function addDiscussionReplyAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const slug = formString(formData, "slug");
  const threadId = formString(formData, "threadId");
  const content = formString(formData, "content").trim();

  const { user } = await requireProfile(`/discussions/${slug}`);

  if (content.length < 2) {
    return { status: "error", message: "Reply is too short." };
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("discussion_replies").insert({
    thread_id: threadId,
    user_id: user.id,
    content
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  await supabase
    .from("discussion_threads")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", threadId);

  revalidatePath(`/discussions/${slug}`);

  return { status: "success", message: "Reply posted." };
}
