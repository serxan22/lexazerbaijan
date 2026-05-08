import { createOptionalServerSupabaseClient } from "@/lib/supabase/server";

function first<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export async function getDiscussionThreads() {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("discussion_threads")
    .select(`
      id,
      title,
      slug,
      body,
      created_at,
      updated_at,
      profiles:author_id (
        full_name,
        username,
        avatar_url,
        verified_writer
      ),
      discussion_replies (
        id
      )
    `)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];

  return (data as any[]).map((thread) => ({
    id: thread.id,
    title: thread.title,
    slug: thread.slug,
    body: thread.body,
    createdAt: thread.created_at,
    updatedAt: thread.updated_at,
    repliesCount: thread.discussion_replies?.length ?? 0,
    author: {
      fullName: first(thread.profiles)?.full_name ?? "LexAzerbaijan user",
      username: first(thread.profiles)?.username ?? "user",
      avatarUrl: first(thread.profiles)?.avatar_url ?? null,
      verifiedWriter: Boolean(first(thread.profiles)?.verified_writer)
    }
  }));
}

export async function getDiscussionThreadBySlug(slug: string) {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("discussion_threads")
    .select(`
      id,
      title,
      slug,
      body,
      created_at,
      updated_at,
      profiles:author_id (
        full_name,
        username,
        avatar_url,
        verified_writer
      )
    `)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;

  const thread = data as any;

  return {
    id: thread.id,
    title: thread.title,
    slug: thread.slug,
    body: thread.body,
    createdAt: thread.created_at,
    updatedAt: thread.updated_at,
    author: {
      fullName: first(thread.profiles)?.full_name ?? "LexAzerbaijan user",
      username: first(thread.profiles)?.username ?? "user",
      avatarUrl: first(thread.profiles)?.avatar_url ?? null,
      verifiedWriter: Boolean(first(thread.profiles)?.verified_writer)
    }
  };
}

export async function getDiscussionReplies(threadId: string) {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("discussion_replies")
    .select(`
      id,
      content,
      user_id,
      created_at,
      updated_at,
      profiles:user_id (
        full_name,
        username,
        avatar_url,
        verified_writer
      )
    `)
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return (data as any[]).map((reply) => ({
    id: reply.id,
    content: reply.content,
    userId: reply.user_id,
    createdAt: reply.created_at,
    updatedAt: reply.updated_at,
    author: {
      fullName: first(reply.profiles)?.full_name ?? "LexAzerbaijan user",
      username: first(reply.profiles)?.username ?? "user",
      avatarUrl: first(reply.profiles)?.avatar_url ?? null,
      verifiedWriter: Boolean(first(reply.profiles)?.verified_writer)
    }
  }));
}

export async function getAdminDiscussionThreads() {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("discussion_threads")
    .select(`
      id,
      title,
      slug,
      body,
      created_at,
      updated_at,
      profiles:author_id (
        full_name,
        username,
        avatar_url,
        verified_writer
      ),
      discussion_replies (
        id,
        content,
        created_at,
        profiles:user_id (
          full_name,
          username
        )
      )
    `)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];

  return (data as any[]).map((thread) => ({
    id: thread.id,
    title: thread.title,
    slug: thread.slug,
    body: thread.body,
    createdAt: thread.created_at,
    updatedAt: thread.updated_at,
    author: {
      fullName: first(thread.profiles)?.full_name ?? "LexAzerbaijan user",
      username: first(thread.profiles)?.username ?? "user",
      avatarUrl: first(thread.profiles)?.avatar_url ?? null,
      verifiedWriter: Boolean(first(thread.profiles)?.verified_writer)
    },
    replies: (thread.discussion_replies ?? []).map((reply: any) => ({
      id: reply.id,
      content: reply.content,
      createdAt: reply.created_at,
      author: {
        fullName: first(reply.profiles)?.full_name ?? "LexAzerbaijan user",
        username: first(reply.profiles)?.username ?? "user"
      }
    }))
  }));
}
