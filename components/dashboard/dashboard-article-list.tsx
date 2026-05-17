import Link from "next/link";
import { Edit3, Eye, Heart, MessageSquare, Send, Trash2 } from "lucide-react";

import { deleteDraftAction, submitForReviewAction } from "@/lib/actions/articles";
import type { DashboardArticle } from "@/lib/content-types";
import type { Dictionary } from "@/lib/i18n";
import { localizeCategory } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import { formatDate, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

export function DashboardArticleList({
  articles,
  dictionary,
  locale
}: {
  articles: DashboardArticle[];
  dictionary: Dictionary;
  locale: Locale;
}) {
  if (!articles.length) {
    return (
      <div className="premium-surface border-dashed p-10 text-center">
        <h2 className="font-serif text-2xl font-semibold text-slate-950">{dictionary.dashboard.noSubmissionsTitle}</h2>
        <p className="mt-2 text-slate-500">{dictionary.dashboard.noSubmissionsBody}</p>
        <Button asChild className="mt-6">
          <Link href="/submit">{dictionary.nav.submitArticle}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {articles.map((article) => (
        <Card key={article.id}>
          <CardContent className="p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={article.status} dictionary={dictionary} />
                  <span className="rounded-full border px-2 py-0.5 text-xs text-slate-500">{dictionary.languages[article.language]}</span>
                  {article.category ? <span className="text-xs text-slate-500">{localizeCategory(article.category, dictionary)?.name ?? article.category.name}</span> : null}
                </div>
                <h3 className="mt-3 font-serif text-xl font-semibold text-slate-950">{article.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{article.abstract}</p>
                {article.rejectionReason ? (
                  <p className="mt-3 rounded-md border border-red-100 bg-red-50 p-3 text-sm text-red-700">
                    {article.rejectionReason}
                  </p>
                ) : null}
                <p className="mt-3 text-xs text-slate-500">{dictionary.common.updated} {formatDate(article.updatedAt, undefined, locale)}</p>
              </div>
              <div className="grid shrink-0 gap-3 lg:w-[320px]">
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {formatNumber(article.viewsCount, locale)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5" />
                    {formatNumber(article.likesCount, locale)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {formatNumber(article.commentsCount, locale)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.status === "approved" ? (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/articles/${article.slug}`}>{dictionary.common.view}</Link>
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/articles/${article.id}/edit`}>
                        <Edit3 className="h-4 w-4" />
                        {dictionary.common.edit}
                      </Link>
                    </Button>
                  )}
                  {article.status === "draft" || article.status === "rejected" ? (
                    <form action={submitForReviewAction}>
                      <input type="hidden" name="articleId" value={article.id} />
                      <Button size="sm" variant="gold">
                        <Send className="h-4 w-4" />
                        {dictionary.common.submit}
                      </Button>
                    </form>
                  ) : null}
                  {article.status === "draft" || article.status === "rejected" ? (
                    <form action={deleteDraftAction}>
                      <input type="hidden" name="articleId" value={article.id} />
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                        {dictionary.common.delete}
                      </Button>
                    </form>
                  ) : null}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
