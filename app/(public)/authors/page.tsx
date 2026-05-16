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
    <div className="premium-page">
      <section className="premium-hero">
        <div className="premium-hero-inner">
          <p className="eyebrow">{dictionary.nav.authors}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950 dark:text-white">{dictionary.pages.authorsTitle}</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
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
