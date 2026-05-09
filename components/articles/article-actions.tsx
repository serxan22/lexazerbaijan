"use client";

import { useEffect, useState } from "react";
import { Bookmark, Check, Copy, Heart, Linkedin } from "lucide-react";

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
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const [bookmarked, setBookmarked] = useState(false);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/articles/${slug}/like?articleId=${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        setLiked(Boolean(data.liked));
        if (typeof data.likesCount === "number") {
          setLocalLikesCount(data.likesCount);
        }
      })
      .catch(() => {});

    fetch(`/api/articles/${slug}/bookmark?articleId=${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        setBookmarked(Boolean(data.bookmarked));
      })
      .catch(() => {});
  }, [articleId, slug]);

  async function handleLike() {
    if (isLikeLoading) return;

    const previousLiked = liked;
    const previousCount = localLikesCount;
    const nextLiked = !previousLiked;

    setLiked(nextLiked);
    setLocalLikesCount(Math.max(0, previousCount + (nextLiked ? 1 : -1)));
    setIsLikeLoading(true);

    try {
      const res = await fetch(`/api/articles/${slug}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId })
      });

      if (res.status === 401) {
        window.location.href = `/login?next=/articles/${slug}`;
        return;
      }

      if (!res.ok) throw new Error("Failed to toggle like");

      const data = await res.json();
      setLiked(Boolean(data.liked));

      if (typeof data.likesCount === "number") {
        setLocalLikesCount(data.likesCount);
      }
    } catch {
      setLiked(previousLiked);
      setLocalLikesCount(previousCount);
    } finally {
      setIsLikeLoading(false);
    }
  }

  async function handleBookmark() {
    if (isBookmarkLoading) return;

    const previousBookmarked = bookmarked;
    const nextBookmarked = !previousBookmarked;

    setBookmarked(nextBookmarked);
    setIsBookmarkLoading(true);

    try {
      const res = await fetch(`/api/articles/${slug}/bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId })
      });

      if (res.status === 401) {
        window.location.href = `/login?next=/articles/${slug}`;
        return;
      }

      if (!res.ok) throw new Error("Failed to toggle bookmark");

      const data = await res.json();
      setBookmarked(Boolean(data.bookmarked));
    } catch {
      setBookmarked(previousBookmarked);
    } finally {
      setIsBookmarkLoading(false);
    }
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
        aria-pressed={liked}
        className={`transition-all duration-200 active:scale-95 ${
          liked
            ? "bg-red-600 text-white hover:bg-red-700"
            : ""
        }`}
      >
        <Heart className={liked ? "h-4 w-4 fill-current" : "h-4 w-4"} />
        {formatNumber(localLikesCount, locale)}
      </Button>

      <Button
        type="button"
        variant={bookmarked ? "default" : "outline"}
        size="sm"
        onClick={handleBookmark}
        aria-pressed={bookmarked}
        className={`transition-all duration-200 active:scale-95 ${
          bookmarked
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : ""
        }`}
      >
        <Bookmark className={bookmarked ? "h-4 w-4 fill-current" : "h-4 w-4"} />
        {bookmarked ? "Bookmarked" : dictionary.common.bookmark}
      </Button>

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
