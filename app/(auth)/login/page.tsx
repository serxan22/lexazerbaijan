import type { Metadata } from "next";

import { LoginForm } from "@/components/forms/auth-forms";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return { title: dictionary.forms.loginTitle };
}

export default async function LoginPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="premium-page py-16">
      <div className="legal-container">
        <LoginForm dictionary={dictionary} />
      </div>
    </div>
  );
}
