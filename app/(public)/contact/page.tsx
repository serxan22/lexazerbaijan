import type { Metadata } from "next";
import { Mail, MessageSquare, Scale } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.footer.contact,
    description: dictionary.pages.contactBody
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const icons = [Mail, MessageSquare, Scale];

  return (
    <div className="premium-page">
      <section className="premium-hero py-14">
        <div className="legal-container">
          <p className="eyebrow">{dictionary.footer.contact}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">{dictionary.pages.contactTitle}</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            {dictionary.pages.contactBody}
          </p>
        </div>
      </section>
      <section className="legal-container grid gap-8 py-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          {dictionary.pages.contactCards.map(([title, body], index) => {
            const Icon = icons[index] ?? Mail;
            return (
            <div key={title} className="premium-surface p-5">
              <Icon className="h-5 w-5 text-gold" />
              <h2 className="mt-3 font-semibold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </div>
            );
          })}
        </div>
        <ContactForm dictionary={dictionary} />
      </section>
    </div>
  );
}
