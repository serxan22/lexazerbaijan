import { getCurrentProfile } from "@/lib/auth";
import { getDictionary, getLocale } from "@/lib/i18n";
import { HeaderClient } from "@/components/layout/site-header-client";

export async function SiteHeader() {
  const [profile, locale] = await Promise.all([getCurrentProfile(), getLocale()]);
  const dictionary = await getDictionary(locale);

  return (
    <HeaderClient
      locale={locale}
      dictionary={dictionary}
      profile={
        profile
          ? {
              fullName: profile.full_name,
              username: profile.username,
              avatarUrl: profile.avatar_url,
              role: profile.role
            }
          : null
      }
    />
  );
}
