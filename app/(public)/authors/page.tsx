import type { Metadata } from "next";

import { AuthorCard } from "@/components/articles/author-card";
import { getTopAuthors } from "@/lib/data";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.nav.authors,
    description: dictionary.pages.authorsDescription
  };
}

export default async function AuthorsPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const authors = await getTopAuthors();

  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-14">
        <div className="legal-container">
          <p className="eyebrow">{dictionary.nav.authors}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">{dictionary.pages.authorsTitle}</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            {dictionary.pages.authorsBody}
          </p>
        </div>
      </section>
      <section className="legal-container grid gap-5 py-10 md:grid-cols-3">
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} dictionary={dictionary} locale={locale} />
        ))}
      </section>
    </div>
  );
}
