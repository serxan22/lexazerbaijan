import type { Metadata } from "next";

import { SignUpForm } from "@/components/forms/auth-forms";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary(await getLocale());
  return {
    title: dictionary.forms.signupTitle,
    description: dictionary.forms.signupDescription
  };
}

export default async function SignUpPage() {
  const dictionary = await getDictionary(await getLocale());

  return (
    <div className="premium-page py-16">
      <div className="legal-container">
        <SignUpForm dictionary={dictionary} />
      </div>
    </div>
  );
}
