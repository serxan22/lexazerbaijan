import { createOptionalServerSupabaseClient } from "@/lib/supabase/server";

export async function getUserNotifications(userId: string) {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("notifications")
    .select("id, type, title, body, href, read_at, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error || !data) return [];

  return data.map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    body: item.body,
    href: item.href,
    readAt: item.read_at,
    createdAt: item.created_at
  }));
}
