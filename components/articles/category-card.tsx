import Link from "next/link";
import { ArrowRight, BookMarked } from "lucide-react";

import type { CategorySummary } from "@/lib/content-types";
import type { Dictionary } from "@/lib/i18n";
import { localizeCategory } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import { formatNumber } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export function CategoryCard({
  category,
  dictionary,
  locale
}: {
  category: CategorySummary;
  dictionary: Dictionary;
  locale: Locale;
}) {
  const localized = localizeCategory(category, dictionary) ?? category;
  const count = category.count ?? 0;
  const isEmpty = count === 0;

  return (
    <Link
      href={isEmpty ? "#" : `/articles?category=${category.slug}`}
      aria-disabled={isEmpty}
      className={`group block h-full ${isEmpty ? "pointer-events-none opacity-70" : ""}`}
    >
      <Card className="h-full transition duration-300 group-hover:-translate-y-1 group-hover:border-[#b8894a]/60 group-hover:shadow-[0_22px_70px_rgba(184,137,74,0.14)]">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="premium-icon flex h-10 w-10 items-center justify-center rounded-md">
              <BookMarked className="h-5 w-5" />
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-gold" />
          </div>
          <h3 className="mt-5 font-serif text-xl font-semibold text-slate-950 dark:text-white">{localized.name}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{localized.description}</p>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
            {isEmpty
              ? dictionary.common.comingSoon
              : `${formatNumber(count, locale)} ${dictionary.common.articles}`}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
