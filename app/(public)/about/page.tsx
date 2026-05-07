import type { Metadata } from "next";
import { BookOpen, GraduationCap, Scale, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.nav.about,
    description: dictionary.pages.aboutTitle
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const icons = [GraduationCap, Scale, Users];

  return (
    <div className="bg-white">
      <section className="border-b bg-slate-50 py-16">
        <div className="legal-container max-w-4xl">
          <p className="eyebrow">{dictionary.nav.about}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-slate-950">
            {dictionary.pages.aboutTitle}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            {dictionary.pages.aboutBody}
          </p>
        </div>
      </section>
      <section className="legal-container grid gap-6 py-14 md:grid-cols-3">
        {dictionary.pages.aboutCards.map(([title, body], index) => {
          const Icon = icons[index] ?? Users;
          return (
          <Card key={title}>
            <CardContent className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-blue-800">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-serif text-2xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </CardContent>
          </Card>
          );
        })}
      </section>
      <section className="border-y bg-slate-50 py-14">
        <div className="legal-container max-w-4xl">
          <BookOpen className="h-8 w-8 text-gold" />
          <h2 className="mt-5 font-serif text-4xl font-semibold text-slate-950">{dictionary.pages.editorialStandard}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {dictionary.pages.editorialStandardBody}
          </p>
        </div>
      </section>
    </div>
  );
}
