"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { clientKey, rateLimit } from "@/lib/rate-limit";
import { formString } from "@/lib/form-data";
import type { ActionState } from "@/lib/form-state";
import { zodErrors } from "@/lib/form-state";
import { getDictionary } from "@/lib/i18n";
import { plainText } from "@/lib/sanitize";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { contactSchema, newsletterSchema } from "@/lib/validation";

export async function newsletterAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const headerList = await headers();
  const limit = rateLimit(clientKey(headerList, "newsletter"), { intervalMs: 60 * 60 * 1000, max: 3 });

  if (!limit.success) {
    return { status: "error", message: dictionary.messages.newsletterRateLimit };
  }

  const parsed = newsletterSchema.safeParse({
    email: formString(formData, "email")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.validEmail, errors: zodErrors(parsed.error.flatten()) };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email: parsed.data.email }, { onConflict: "email", ignoreDuplicates: true });

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/");
  return { status: "success", message: dictionary.messages.subscribed };
}

export async function contactAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const headerList = await headers();
  const limit = rateLimit(clientKey(headerList, "contact"), { intervalMs: 60 * 60 * 1000, max: 4 });

  if (!limit.success) {
    return { status: "error", message: dictionary.messages.contactRateLimit };
  }

  const parsed = contactSchema.safeParse({
    name: formString(formData, "name"),
    email: formString(formData, "email"),
    subject: formString(formData, "subject"),
    message: formString(formData, "message")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.checkFields, errors: zodErrors(parsed.error.flatten()) };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: plainText(parsed.data.name),
    email: parsed.data.email,
    subject: plainText(parsed.data.subject),
    message: plainText(parsed.data.message)
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success", message: dictionary.messages.messageSent };
}
