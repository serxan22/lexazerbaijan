"use server";

import { revalidatePath } from "next/cache";

import { requireProfile } from "@/lib/auth";
import { formString } from "@/lib/form-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function markNotificationReadAction(formData: FormData) {
  const notificationId = formString(formData, "notificationId");
  const { user } = await requireProfile("/");

  const supabase = await createServerSupabaseClient();

  await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", notificationId)
    .eq("user_id", user.id);

  revalidatePath("/");
}

export async function markAllNotificationsReadAction() {
  const { user } = await requireProfile("/");

  const supabase = await createServerSupabaseClient();

  await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .is("read_at", null);

  revalidatePath("/");
}
