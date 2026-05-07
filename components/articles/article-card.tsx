import Link from "next/link";
import { BookOpen, Eye, Heart, Timer } from "lucide-react";

import type { ArticleCardItem } from "@/lib/content-types";
import type { Dictionary } from "@/lib/i18n";
import { localizeCategory } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import { formatDate, formatNumber, initials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

type ArticleCardProps = {
  article: ArticleCardItem;
  featured?: boolean;
  showStatus?: boolean;
  dictionary: Dictionary;
  locale: Locale;
};

export function ArticleCard({ article, featured = false, showStatus = false, dictionary, locale }: ArticleCardProps) {
  const category = localizeCategory(article.category, dictionary);

  return (
    <Card className="group h-full overflow-hidden border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-soft">
      <Link href={`/articles/${article.slug}`} aria-label={article.title}>
        <div className={featured ? "aspect-[1.65] overflow-hidden bg-slate-100" : "aspect-[1.85] overflow-hidden bg-slate-100"}>
          {article.coverImageUrl ? (
            <img
              src={article.coverImageUrl}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#0B1220,#1D4ED8)] text-white">
              <BookOpen className="h-10 w-10 opacity-80" />
            </div>
          )}
        </div>
      </Link>
      <CardContent className="flex h-[calc(100%-1px)] flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {category ? (
            <Badge variant="gold">
              <Link href={`/articles?category=${article.category?.slug}`}>{category.name}</Link>
            </Badge>
          ) : null}
          {showStatus ? <StatusBadge status={article.status} dictionary={dictionary} /> : null}
          <Badge variant="outline">{dictionary.languages[article.language]}</Badge>
        </div>

        <Link href={`/articles/${article.slug}`} className="mt-4 block">
          <h3 className={featured ? "font-serif text-2xl font-semibold leading-tight text-slate-950" : "font-serif text-xl font-semibold leading-tight text-slate-950"}>
            {article.title}
          </h3>
          {article.subtitle ? <p className="mt-2 text-sm leading-6 text-slate-500">{article.subtitle}</p> : null}
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{article.abstract}</p>
        </Link>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-4 border-t pt-4">
            <Link href={`/authors/${article.author.username}`} className="flex min-w-0 items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={article.author.avatarUrl ?? undefined} alt={article.author.fullName} />
                <AvatarFallback>{initials(article.author.fullName)}</AvatarFallback>
              </Avatar>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-slate-900">{article.author.fullName}</span>
                <span className="block text-xs text-slate-500">{formatDate(article.publishedAt ?? article.createdAt, undefined, locale)}</span>
              </span>
            </Link>
            <div className="flex shrink-0 items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1" title={dictionary.common.readingTime}>
                <Timer className="h-3.5 w-3.5" />
                {article.readingTime} {dictionary.common.minuteShort}
              </span>
              <span className="inline-flex items-center gap-1" title={dictionary.common.views}>
                <Eye className="h-3.5 w-3.5" />
                {formatNumber(article.viewsCount, locale)}
              </span>
              <span className="inline-flex items-center gap-1" title={dictionary.common.likes}>
                <Heart className="h-3.5 w-3.5" />
                {formatNumber(article.likesCount, locale)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
