"use client";

import { useState, useTransition } from "react";
import { Bookmark, Check, Copy, Heart, Linkedin } from "lucide-react";

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
  const [liked, setLiked] = useState(false);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  function handleLike() {
    const nextLiked = !liked;

    setLiked(nextLiked);
    setLocalLikesCount((count) => Math.max(0, count + (nextLiked ? 1 : -1)));

    const formData = new FormData();
    formData.set("articleId", articleId);
    formData.set("slug", slug);

    startTransition(async () => {
      try {
        await likeArticleAction(formData);
      } catch {
        setLiked(!nextLiked);
        setLocalLikesCount((count) => Math.max(0, count + (nextLiked ? -1 : 1)));
      }
    });
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant={liked ? "default" : "outline"}
        size="sm"
        onClick={handleLike}
        disabled={isPending}
        aria-pressed={liked}
      >
        <Heart className={liked ? "h-4 w-4 fill-current" : "h-4 w-4"} />
        {formatNumber(localLikesCount, locale)}
      </Button>

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

      <Button type="button" variant="ghost" size="sm" onClick={handleCopyLink}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy link"}
      </Button>

      <ReportArticleDialog articleId={articleId} slug={slug} dictionary={dictionary} />
    </div>
  );
}
