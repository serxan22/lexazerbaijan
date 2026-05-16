import { redirect } from "next/navigation";

import { createOptionalServerSupabaseClient, createServerSupabaseClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

export async function getCurrentUser() {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return null;

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentProfile() {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return null;

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  return data;
}

export async function requireUser(next = "/dashboard") {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  return user;
}

export async function requireProfile(next = "/dashboard") {
  const user = await requireUser(next);
  const supabase = await createServerSupabaseClient();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();

  if (!profile?.username) redirect("/profile-setup");
  return { user, profile };
}

export async function requireRole(roles: UserRole[], next = "/dashboard") {
  const { user, profile } = await requireProfile(next);
  if (!roles.includes(profile.role)) redirect("/unauthorized");
  return { user, profile };
}

export function isEditorialRole(role?: UserRole | null) {
  return role === "editor" || role === "admin";
}
