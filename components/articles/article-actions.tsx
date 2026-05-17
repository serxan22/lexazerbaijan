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
    const likedCacheKey = `lex-liked-${articleId}`;
    const bookmarkedCacheKey = `lex-bookmarked-${articleId}`;

    setLiked(localStorage.getItem(likedCacheKey) === "1");
    setBookmarked(localStorage.getItem(bookmarkedCacheKey) === "1");

    fetch(`/api/articles/${slug}/like?articleId=${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        const serverLiked = Boolean(data.liked);
        setLiked(serverLiked);
        localStorage.setItem(likedCacheKey, serverLiked ? "1" : "0");
        if (typeof data.likesCount === "number") {
          setLocalLikesCount(data.likesCount);
        }
      })
      .catch(() => {});

    fetch(`/api/articles/${slug}/bookmark?articleId=${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        const serverBookmarked = Boolean(data.bookmarked);
        setBookmarked(serverBookmarked);
        localStorage.setItem(bookmarkedCacheKey, serverBookmarked ? "1" : "0");
      })
      .catch(() => {});
  }, [articleId, slug]);

  async function handleLike() {
    if (isLikeLoading) return;

    const previousLiked = liked;
    const previousCount = localLikesCount;
    const nextLiked = !previousLiked;

    setLiked(nextLiked);
    localStorage.setItem(`lex-liked-${articleId}`, nextLiked ? "1" : "0");
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
      const serverLiked = Boolean(data.liked);
      setLiked(serverLiked);
      localStorage.setItem(`lex-liked-${articleId}`, serverLiked ? "1" : "0");

      if (typeof data.likesCount === "number") {
        setLocalLikesCount(data.likesCount);
      }
    } catch {
      setLiked(previousLiked);
      localStorage.setItem(`lex-liked-${articleId}`, previousLiked ? "1" : "0");
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
    localStorage.setItem(`lex-bookmarked-${articleId}`, nextBookmarked ? "1" : "0");
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
      const serverBookmarked = Boolean(data.bookmarked);
      setBookmarked(serverBookmarked);
      localStorage.setItem(`lex-bookmarked-${articleId}`, serverBookmarked ? "1" : "0");
    } catch {
      setBookmarked(previousBookmarked);
      localStorage.setItem(`lex-bookmarked-${articleId}`, previousBookmarked ? "1" : "0");
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
            ? "bg-[#0B1220] text-white hover:bg-[#172033] dark:bg-[#f3d28d] dark:text-[#0B1220] dark:hover:bg-[#ffe2a4]"
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
