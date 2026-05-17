import { Search } from "lucide-react";

import type { CategorySummary } from "@/lib/content-types";
import type { Dictionary } from "@/lib/i18n";
import { localizeCategory } from "@/lib/i18n";
import { locales, type Locale } from "@/lib/i18n-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ArticleFilters({
  categories,
  search,
  category,
  language,
  sort,
  dictionary
}: {
  categories: CategorySummary[];
  search?: string;
  category?: string;
  language?: Locale;
  sort?: string;
  dictionary: Dictionary;
}) {
  return (
    <form className="premium-surface grid gap-3 p-3 md:grid-cols-[1fr_200px_170px_190px_auto]" action="/articles">
      <label className="relative">
        <span className="sr-only">{dictionary.common.searchArticles}</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input name="search" defaultValue={search} placeholder={`${dictionary.common.search}...`} className="pl-9" />
      </label>
      <label>
        <span className="sr-only">{dictionary.common.category}</span>
        <select
          name="category"
          defaultValue={category ?? ""}
          className="premium-input h-10 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8894a]"
        >
          <option value="">{dictionary.common.allCategories}</option>
          {categories.map((item) => (
            <option key={item.id} value={item.slug}>
              {localizeCategory(item, dictionary)?.name ?? item.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">{dictionary.nav.language}</span>
        <select
          name="language"
          defaultValue={language ?? ""}
          className="premium-input h-10 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8894a]"
        >
          <option value="">{dictionary.nav.language}</option>
          {locales.map((item) => (
            <option key={item} value={item}>
              {dictionary.languages[item]}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">{dictionary.common.sortArticles}</span>
        <select
          name="sort"
          defaultValue={sort ?? "latest"}
          className="premium-input h-10 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8894a]"
        >
          <option value="latest">{dictionary.common.latest}</option>
          <option value="most_liked">{dictionary.common.mostLiked}</option>
          <option value="most_viewed">{dictionary.common.mostViewed}</option>
        </select>
      </label>
      <Button type="submit">{dictionary.common.filter}</Button>
    </form>
  );
}
