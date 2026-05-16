import { CinematicHomepage, type CinematicHomepageProps } from "@/components/home/cinematic-homepage";
import { getCategories, getFeaturedArticles, getLatestArticles, getTopAuthors } from "@/lib/data";
import { getDiscussionThreads } from "@/lib/discussions";
import { getDictionary, getLocale, localizeCategory, type Dictionary } from "@/lib/i18n";
import type { ArticleCardItem, AuthorSummary, CategorySummary } from "@/lib/content-types";

type ArticlePreview = CinematicHomepageProps["featuredArticles"][number];
type AuthorPreview = CinematicHomepageProps["authors"][number];
type CategoryPreview = CinematicHomepageProps["categories"][number];
type DiscussionPreview = CinematicHomepageProps["discussions"][number];

function articlePreview(article: ArticleCardItem, dictionary: Dictionary): ArticlePreview {
  const category = localizeCategory(article.category, dictionary);

  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    abstract: article.abstract,
    categoryName: category?.name ?? null,
    authorName: article.author.fullName,
    language: article.language,
    readingTime: article.readingTime,
    viewsCount: article.viewsCount,
    likesCount: article.likesCount,
    publishedAt: article.publishedAt,
    createdAt: article.createdAt
  };
}

function categoryPreview(category: CategorySummary, dictionary: Dictionary): CategoryPreview {
  const localized = localizeCategory(category, dictionary);

  return {
    id: category.id,
    name: localized?.name ?? category.name,
    slug: category.slug,
    description: localized?.description ?? category.description,
    count: category.count ?? 0
  };
}

function authorPreview(author: AuthorSummary, dictionary: Dictionary): AuthorPreview {
  return {
    id: author.id,
    fullName: author.fullName,
    username: author.username,
    role: author.role,
    affiliation: author.workplace ?? author.university ?? dictionary.site.independentResearcher,
    interests: author.interests,
    publishedCount: author.publishedCount,
    totalViews: author.totalViews,
    totalLikes: author.totalLikes
  };
}

function discussionPreview(thread: {
  id: string;
  title: string;
  slug: string;
  body: string;
  updatedAt: string;
  repliesCount: number;
  author: { fullName: string };
}): DiscussionPreview {
  return {
    id: thread.id,
    title: thread.title,
    slug: thread.slug,
    body: thread.body,
    authorName: thread.author.fullName,
    repliesCount: thread.repliesCount,
    updatedAt: thread.updatedAt
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const [featuredArticles, latestArticles, categories, authors, discussions] = await Promise.all([
    getFeaturedArticles(),
    getLatestArticles(8),
    getCategories(),
    getTopAuthors(),
    getDiscussionThreads()
  ]);

  return (
    <CinematicHomepage
      dictionary={dictionary}
      locale={locale}
      featuredArticles={featuredArticles.map((article) => articlePreview(article, dictionary))}
      latestArticles={latestArticles.map((article) => articlePreview(article, dictionary))}
      categories={categories
        .map((category) => categoryPreview(category, dictionary))
        .sort((a, b) => b.count - a.count)}
      authors={authors.map((author) => authorPreview(author, dictionary))}
      discussions={discussions.slice(0, 6).map(discussionPreview)}
    />
  );
}
