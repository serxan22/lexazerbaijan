"use client";

import { useEffect } from "react";

export function ArticleViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `lex_viewed_article_${slug}`;

    if (window.localStorage.getItem(key)) return;

    window.localStorage.setItem(key, "1");

    fetch(`/api/articles/${slug}/view`, {
      method: "POST"
    }).catch(() => {});
  }, [slug]);

  return null;
}
