import { cache } from "react";

import { demoArticleDetails, demoArticles, demoAuthors, demoCategories } from "@/lib/demo-data";
import type {
  AdminArticle,
  ArticleComment,
  ArticleCardItem,
  ArticleDetail,
  AuthorSummary,
  CategorySummary,
  DashboardArticle
} from "@/lib/content-types";
import { createOptionalServerSupabaseClient } from "@/lib/supabase/server";
import type { ArticleLanguage, ArticleStatus, Json, UserRole } from "@/types/database";

type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  abstract: string;
  content?: string;
  cover_image_url: string | null;
  language?: ArticleLanguage | null;
  status: ArticleStatus;
  views_count: number;
  likes_count: number;
  reading_time: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  rejection_reason?: string | null;
  author_id?: string;
  category_id?: string | null;
  profiles?: ProfileRow | ProfileRow[] | null;
  categories?: CategoryRow | CategoryRow[] | null;
  article_tags?: { tags: { name: string } | { name: string }[] | null }[];
};

type ProfileRow = {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  university: string | null;
  workplace: string | null;
  role: UserRole;
  interests: string[] | null;
  social_links: Json | null;
};

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

function first<T>(value: T | T[] | null | undefined) {
  return Array.isArray(value) ? value[0] : value ?? null;
}

function socialLinks(value: Json | null): AuthorSummary["socialLinks"] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as AuthorSummary["socialLinks"];
}

function mapCategory(row?: CategoryRow | null): CategorySummary | null {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description
  };
}

function mapAuthor(row?: ProfileRow | null): AuthorSummary {
  if (!row) {
    return demoAuthors[0];
  }

  return {
    id: row.id,
    fullName: row.full_name ?? "LexAzerbaijan Author",
    username: row.username ?? row.id,
    avatarUrl: row.avatar_url,
    bio: row.bio,
    university: row.university,
    workplace: row.workplace,
    interests: row.interests ?? [],
    socialLinks: socialLinks(row.social_links),
    role: row.role,
    totalViews: 0,
    totalLikes: 0,
    publishedCount: 0
  };
}

function mapArticle(row: ArticleRow): ArticleCardItem {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    subtitle: row.subtitle,
    abstract: row.abstract,
    coverImageUrl: row.cover_image_url,
    language: row.language ?? "en",
    category: mapCategory(first(row.categories)),
    author: mapAuthor(first(row.profiles)),
    status: row.status,
    viewsCount: row.views_count,
    likesCount: row.likes_count,
    readingTime: row.reading_time,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    tags: row.article_tags
      ?.map((item) => first(item.tags)?.name)
      .filter(Boolean) as string[] | undefined
  };
}

const articleSelect = `
  id,
  title,
  slug,
  subtitle,
  abstract,
  cover_image_url,
  language,
  status,
  views_count,
  likes_count,
  reading_time,
  published_at,
  created_at,
  updated_at,
  profiles:author_id (
    id,
    full_name,
    username,
    avatar_url,
    bio,
    university,
    workplace,
    role,
    interests,
    social_links
  ),
  categories:category_id (
    id,
    name,
    slug,
    description
  ),
  article_tags (
    tags (
      name
    )
  )
`;

export const getCategories = cache(async (): Promise<CategorySummary[]> => {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return demoCategories;

  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error || !data) return demoCategories;
  return data.map(mapCategory).filter(Boolean) as CategorySummary[];
});

export const getFeaturedArticles = cache(async (): Promise<ArticleCardItem[]> => {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return demoArticles.slice(0, 3);

  const { data, error } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "approved")
    .order("likes_count", { ascending: false })
    .order("views_count", { ascending: false })
    .limit(3);

  if (error || !data) return demoArticles.slice(0, 3);
  return (data as ArticleRow[]).map(mapArticle);
});

export const getLatestArticles = cache(async (limit = 6): Promise<ArticleCardItem[]> => {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return demoArticles.slice(0, limit);

  const { data, error } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "approved")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error || !data) return demoArticles.slice(0, limit);
  return (data as ArticleRow[]).map(mapArticle);
});

export async function getArticles(params: {
  search?: string;
  category?: string;
  language?: ArticleLanguage;
  sort?: "latest" | "most_liked" | "most_viewed";
}): Promise<ArticleCardItem[]> {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) {
    return demoArticles
      .filter((article) => {
        const matchesSearch = params.search
          ? `${article.title} ${article.abstract}`.toLowerCase().includes(params.search.toLowerCase())
          : true;
        const matchesCategory = params.category ? article.category?.slug === params.category : true;
        const matchesLanguage = params.language ? article.language === params.language : true;
        return matchesSearch && matchesCategory && matchesLanguage;
      })
      .sort((a, b) => {
        if (params.sort === "most_liked") return b.likesCount - a.likesCount;
        if (params.sort === "most_viewed") return b.viewsCount - a.viewsCount;
        return new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime();
      });
  }

  let query = supabase.from("articles").select(articleSelect).eq("status", "approved");

  if (params.search) {
    query = query.or(`title.ilike.%${params.search}%,abstract.ilike.%${params.search}%`);
  }

  if (params.category) {
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", params.category)
      .maybeSingle();
    if (category?.id) query = query.eq("category_id", category.id);
  }

  if (params.language) {
    query = query.eq("language", params.language);
  }

  if (params.sort === "most_liked") {
    query = query.order("likes_count", { ascending: false });
  } else if (params.sort === "most_viewed") {
    query = query.order("views_count", { ascending: false });
  } else {
    query = query.order("published_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error || !data) return [];
  return (data as ArticleRow[]).map(mapArticle);
}

export async function getArticleBySlug(
  slug: string,
  options: { incrementViews?: boolean } = { incrementViews: true }
): Promise<ArticleDetail | null> {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return demoArticleDetails.find((article) => article.slug === slug) ?? null;

  if (options.incrementViews !== false) {
    await supabase.rpc("increment_article_views", { article_slug: slug });
  }

  const { data, error } = await supabase
    .from("articles")
    .select(`${articleSelect}, content`)
    .eq("slug", slug)
    .eq("status", "approved")
    .maybeSingle();

  if (error || !data) return null;

  const article = mapArticle(data as ArticleRow);
  const related = await getRelatedArticles(article.category?.id ?? null, article.id);
  return {
    ...article,
    content: (data as ArticleRow).content ?? "",
    related
  };
}

export async function getRelatedArticles(categoryId: string | null, articleId: string) {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return demoArticles.filter((article) => article.id !== articleId).slice(0, 3);

  let query = supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "approved")
    .neq("id", articleId)
    .order("published_at", { ascending: false })
    .limit(3);

  if (categoryId) query = query.eq("category_id", categoryId);

  const { data, error } = await query;
  if (error || !data) return [];
  return (data as ArticleRow[]).map(mapArticle);
}

export async function getTopAuthors(): Promise<AuthorSummary[]> {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return demoAuthors;

  const { data, error } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "approved")
    .order("views_count", { ascending: false })
    .limit(80);

  if (error || !data) return [];

  const authors = new Map<string, AuthorSummary>();
  for (const row of data as ArticleRow[]) {
    const article = mapArticle(row);
    const current = authors.get(article.author.id) ?? article.author;
    current.totalViews += article.viewsCount;
    current.totalLikes += article.likesCount;
    current.publishedCount += 1;
    authors.set(current.id, current);
  }

  return Array.from(authors.values()).sort((a, b) => b.totalViews - a.totalViews).slice(0, 6);
}

export async function getAuthorByUsername(username: string): Promise<AuthorSummary | null> {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return demoAuthors.find((author) => author.username === username) ?? null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (error || !data) return null;

  const articles = await getAuthorArticles(data.id);
  const author = mapAuthor(data);
  author.publishedCount = articles.length;
  author.totalViews = articles.reduce((sum, article) => sum + article.viewsCount, 0);
  author.totalLikes = articles.reduce((sum, article) => sum + article.likesCount, 0);
  return author;
}

export async function getAuthorArticles(authorId: string): Promise<ArticleCardItem[]> {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return demoArticles.filter((article) => article.author.id === authorId);

  const { data, error } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("author_id", authorId)
    .eq("status", "approved")
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return (data as ArticleRow[]).map(mapArticle);
}

export async function getUserArticles(userId: string): Promise<DashboardArticle[]> {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("articles")
    .select(`${articleSelect}, rejection_reason`)
    .eq("author_id", userId)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return (data as ArticleRow[]).map((row) => ({
    ...mapArticle(row),
    rejectionReason: row.rejection_reason ?? null,
    commentsCount: 0
  }));
}

export async function getArticleForEdit(id: string, userId: string) {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("articles")
    .select(`${articleSelect}, content, rejection_reason, category_id`)
    .eq("id", id)
    .eq("author_id", userId)
    .in("status", ["draft", "pending_review", "rejected"])
    .maybeSingle();

  if (error || !data) return null;
  return data as ArticleRow;
}

export async function getArticleForAdminEdit(id: string) {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("articles")
    .select(`${articleSelect}, content, rejection_reason, category_id`)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as ArticleRow;
}

export async function getAdminOverview(): Promise<{
  pendingArticles: AdminArticle[];
  reports: {
    id: string;
    reason: string;
    status: string;
    createdAt: string;
    articleTitle: string;
  }[];
  users: AuthorSummary[];
  stats: {
    totalUsers: number;
    totalPublishedArticles: number;
    pendingArticles: number;
    totalViews: number;
    mostPopular: ArticleCardItem[];
  };
}> {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) {
    return {
      pendingArticles: [],
      reports: [],
      users: demoAuthors,
      stats: {
        totalUsers: demoAuthors.length,
        totalPublishedArticles: demoArticles.length,
        pendingArticles: 0,
        totalViews: demoArticles.reduce((sum, article) => sum + article.viewsCount, 0),
        mostPopular: demoArticles.slice().sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 5)
      }
    };
  }

  const [pendingResult, usersResult, publishedResult, reportsResult] = await Promise.all([
    supabase
      .from("articles")
      .select(`${articleSelect}, rejection_reason`)
      .eq("status", "pending_review")
      .order("updated_at", { ascending: false }),
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(50),
    supabase
      .from("articles")
      .select(articleSelect)
      .eq("status", "approved")
      .order("views_count", { ascending: false })
      .limit(50),
    supabase
      .from("reports")
      .select("id, reason, status, created_at, articles:article_id(title)")
      .order("created_at", { ascending: false })
      .limit(50)
  ]);

  const publishedArticles = ((publishedResult.data ?? []) as ArticleRow[]).map(mapArticle);

  return {
    pendingArticles: ((pendingResult.data ?? []) as ArticleRow[]).map((row) => ({
      ...mapArticle(row),
      rejectionReason: row.rejection_reason ?? null,
      commentsCount: 0
    })),
    reports: ((reportsResult.data ?? []) as {
      id: string;
      reason: string;
      status: string;
      created_at: string;
      articles: { title: string } | { title: string }[] | null;
    }[]).map((report) => ({
      id: report.id,
      reason: report.reason,
      status: report.status,
      createdAt: report.created_at,
      articleTitle: first(report.articles)?.title ?? "Deleted article"
    })),
    users: ((usersResult.data ?? []) as ProfileRow[]).map(mapAuthor),
    stats: {
      totalUsers: usersResult.data?.length ?? 0,
      totalPublishedArticles: publishedArticles.length,
      pendingArticles: pendingResult.data?.length ?? 0,
      totalViews: publishedArticles.reduce((sum, article) => sum + article.viewsCount, 0),
      mostPopular: publishedArticles.slice(0, 5)
    }
  };
}

export async function getArticleComments(articleId: string): Promise<ArticleComment[]> {
  const supabase = await createOptionalServerSupabaseClient();
  if (!supabase) {
    return [
      {
        id: "comment-demo-1",
        content: "This is the kind of careful, source-led discussion Azerbaijan's legal community needs more of.",
        createdAt: "2026-04-20T12:00:00.000Z",
        author: {
          fullName: "Editorial Reader",
          username: "reader",
          avatarUrl: null
        }
      }
    ];
  }

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      created_at,
      user_id,
      profiles:user_id (
        full_name,
        username,
        avatar_url
      )
    `
    )
    .eq("article_id", articleId)
    .eq("status", "visible")
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return (data as unknown as {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    profiles: {
      full_name: string | null;
      username: string | null;
      avatar_url: string | null;
    } | {
      full_name: string | null;
      username: string | null;
      avatar_url: string | null;
    }[] | null;
  }[]).map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.created_at,
    userId: comment.user_id,
    author: {
      fullName: first(comment.profiles)?.full_name ?? "LexAzerbaijan reader",
      username: first(comment.profiles)?.username ?? "reader",
      avatarUrl: first(comment.profiles)?.avatar_url ?? null
    }
  }));
}
