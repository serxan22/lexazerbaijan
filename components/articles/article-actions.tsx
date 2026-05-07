"use client";

import { Bookmark, Heart, Linkedin, Share2 } from "lucide-react";

import { bookmarkArticleAction, likeArticleAction } from "@/lib/actions/articles";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import { absoluteUrl, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ReportArticleDialog } from "@/components/articles/report-article-dialog";

export function ArticleActions({
  articleId,
  slug,
  title,
  likesCount,
  dictionary,
  locale
}: {
  articleId: string;
  slug: string;
  title: string;
  likesCount: number;
  dictionary: Dictionary;
  locale: Locale;
}) {
  const url = absoluteUrl(`/articles/${slug}`);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <form action={likeArticleAction}>
        <input type="hidden" name="articleId" value={articleId} />
        <input type="hidden" name="slug" value={slug} />
        <Button variant="outline" size="sm">
          <Heart className="h-4 w-4" />
          {formatNumber(likesCount, locale)}
        </Button>
      </form>
      <form action={bookmarkArticleAction}>
        <input type="hidden" name="articleId" value={articleId} />
        <input type="hidden" name="slug" value={slug} />
        <Button variant="outline" size="sm">
          <Bookmark className="h-4 w-4" />
          {dictionary.common.bookmark}
        </Button>
      </form>
      <Button variant="ghost" size="sm" asChild>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noreferrer"
        >
          <Share2 className="h-4 w-4" />
          {dictionary.common.share}
        </a>
      </Button>
      <ReportArticleDialog articleId={articleId} slug={slug} dictionary={dictionary} />
    </div>
  );
}
