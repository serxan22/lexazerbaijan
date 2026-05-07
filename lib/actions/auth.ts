"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";
import { formString, optionalFormString, splitCommaList } from "@/lib/form-data";
import type { ActionState } from "@/lib/form-state";
import { zodErrors } from "@/lib/form-state";
import { getDictionary } from "@/lib/i18n";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { forgotPasswordSchema, loginSchema, profileSchema, signUpSchema } from "@/lib/validation";

export async function loginAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const parsed = loginSchema.safeParse({
    email: formString(formData, "email"),
    password: formString(formData, "password")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.checkFields, errors: zodErrors(parsed.error.flatten()) };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { status: "error", message: error.message };
  }

  const next = formString(formData, "next") || "/dashboard";
  revalidatePath("/", "layout");
  redirect(next);
}

export async function signUpAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const parsed = signUpSchema.safeParse({
    fullName: formString(formData, "fullName"),
    username: formString(formData, "username"),
    email: formString(formData, "email"),
    password: formString(formData, "password")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.checkFields, errors: zodErrors(parsed.error.flatten()) };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${siteConfig.url}/auth/callback?next=/profile-setup`,
      data: {
        full_name: parsed.data.fullName,
        username: parsed.data.username
      }
    }
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  if (data.user) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      full_name: parsed.data.fullName,
      username: parsed.data.username,
      role: "user"
    });
  }

  revalidatePath("/", "layout");
  return {
    status: "success",
    message: dictionary.messages.accountCreated
  };
}

export async function forgotPasswordAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const parsed = forgotPasswordSchema.safeParse({
    email: formString(formData, "email")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.validEmail, errors: zodErrors(parsed.error.flatten()) };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${siteConfig.url}/auth/callback?next=/profile-setup`
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success", message: dictionary.messages.passwordResetSent };
}

export async function profileSetupAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const parsed = profileSchema.safeParse({
    fullName: formString(formData, "fullName"),
    username: formString(formData, "username"),
    avatarUrl: optionalFormString(formData, "avatarUrl") ?? "",
    bio: optionalFormString(formData, "bio") ?? "",
    university: optionalFormString(formData, "university") ?? "",
    workplace: optionalFormString(formData, "workplace") ?? "",
    interests: optionalFormString(formData, "interests") ?? "",
    linkedin: optionalFormString(formData, "linkedin") ?? "",
    website: optionalFormString(formData, "website") ?? ""
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.checkFields, errors: zodErrors(parsed.error.flatten()) };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/profile-setup");
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: parsed.data.fullName,
    username: parsed.data.username,
    avatar_url: parsed.data.avatarUrl || null,
    bio: parsed.data.bio || null,
    university: parsed.data.university || null,
    workplace: parsed.data.workplace || null,
    interests: splitCommaList(parsed.data.interests),
    social_links: {
      linkedin: parsed.data.linkedin || undefined,
      website: parsed.data.website || undefined
    }
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
