import { NextResponse } from "next/server";

import { createOptionalServerSupabaseClient } from "@/lib/supabase/server";
import { demoArticles } from "@/lib/demo-data";

function clean(value: string | null | undefined) {
  return (value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = clean(searchParams.get("q")).toLowerCase();

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const supabase = await createOptionalServerSupabaseClient();

  if (!supabase) {
    const results = demoArticles
      .filter((article) =>
        `${article.title} ${article.subtitle ?? ""} ${article.abstract}`
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 6)
      .map((article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        abstract: article.abstract,
        category: article.category?.name ?? null
      }));

    return NextResponse.json({ results });
  }

  const { data, error } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      slug,
      subtitle,
      abstract,
      content,
      status,
      categories:category_id (
        name
      ),
      article_tags (
        tags (
          name
        )
      )
    `)
    .eq("status", "approved")
    .or(
      `title.ilike.%${q}%,subtitle.ilike.%${q}%,abstract.ilike.%${q}%,content.ilike.%${q}%`
    )
    .limit(8);

  if (error || !data) {
    return NextResponse.json({ results: [] });
  }

  const results = data.map((article: any) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    abstract: clean(article.abstract).slice(0, 180),
    category: Array.isArray(article.categories)
      ? article.categories[0]?.name ?? null
      : article.categories?.name ?? null
  }));

  return NextResponse.json({ results });
}
