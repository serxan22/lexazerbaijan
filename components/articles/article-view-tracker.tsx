"use client";

import { useEffect } from "react";

export function ArticleViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed_article_${slug}`;

    if (localStorage.getItem(key)) {
      return;
    }

    localStorage.setItem(key, "1");

    fetch(`/api/articles/${slug}/view`, {
      method: "POST"
    }).catch(() => {});
  }, [slug]);

  return null;
}
