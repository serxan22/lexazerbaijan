import type { MetadataRoute } from "next";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://lexazerbaijan.com";

  const supabase = await createServerSupabaseClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, updated_at, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const staticPages = [
    "",
    "/articles",
    "/discussions",
    "/authors",
    "/about",
    "/lexai",
    "/cases",
    "/contact",
    "/editorial-policy",
    "/submit",
    "/categories",
    "/terms",
    "/privacy"
  ];

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
  }));

  const articleUrls =
    articles?.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(
        article.updated_at ?? article.published_at ?? new Date()
      ),
    })) ?? [];

  return [...staticUrls, ...articleUrls];
}
