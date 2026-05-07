import type { Metadata } from "next";

import { ProfileSetupForm } from "@/components/forms/profile-setup-form";
import { requireUser } from "@/lib/auth";
import { getDictionary, getLocale } from "@/lib/i18n";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return { title: dictionary.forms.profileTitle };
}

export const dynamic = "force-dynamic";

export default async function ProfileSetupPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const user = await requireUser("/profile-setup");
  const supabase = await createServerSupabaseClient();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  const links =
    profile?.social_links && typeof profile.social_links === "object" && !Array.isArray(profile.social_links)
      ? profile.social_links
      : {};

  return (
    <div className="bg-slate-50 py-12">
      <div className="legal-container">
        <ProfileSetupForm
          dictionary={dictionary}
          defaults={{
            fullName: profile?.full_name ?? user.user_metadata.full_name,
            username: profile?.username ?? user.user_metadata.username,
            avatarUrl: profile?.avatar_url,
            bio: profile?.bio,
            university: profile?.university,
            workplace: profile?.workplace,
            interests: profile?.interests,
            linkedin: typeof links.linkedin === "string" ? links.linkedin : "",
            website: typeof links.website === "string" ? links.website : ""
          }}
        />
      </div>
    </div>
  );
}
