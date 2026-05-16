import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/forms/auth-forms";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return { title: dictionary.forms.resetTitle };
}

export default async function ForgotPasswordPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="bg-slate-50 py-16">
      <div className="legal-container">
        <ForgotPasswordForm dictionary={dictionary} />
      </div>
    </div>
  );
}
