import type { Metadata } from "next";

import { CategoryCard } from "@/components/articles/category-card";
import { getCategories } from "@/lib/data";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.nav.categories,
    description: dictionary.pages.categoriesBody
  };
}

export default async function CategoriesPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const categories = await getCategories();

  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-14">
        <div className="legal-container">
          <p className="eyebrow">{dictionary.nav.categories}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">{dictionary.pages.categoriesTitle}</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            {dictionary.pages.categoriesBody}
          </p>
        </div>
      </section>
      <section className="legal-container grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} dictionary={dictionary} locale={locale} />
        ))}
      </section>
    </div>
  );
}
