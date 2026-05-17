import { PremiumHomepage } from "@/components/home/premium-homepage";
import { getFeaturedArticles, getLatestArticles } from "@/lib/data";
import { getDictionary, getLocale, localizeCategory } from "@/lib/i18n";
import { formatDate, formatNumber } from "@/lib/utils";

export default async function HomePage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const [featuredArticles, latestArticles] = await Promise.all([
    getFeaturedArticles(),
    getLatestArticles(6)
  ]);

  const articlesById = new Map(
    [...featuredArticles, ...latestArticles].map((article) => {
      const category = localizeCategory(article.category, dictionary);

      return [
        article.id,
        {
          ...article,
          category: article.category && category
            ? {
                ...article.category,
                name: category.name,
                description: category.description ?? article.category.description
              }
            : article.category,
          displayDate: formatDate(article.publishedAt ?? article.createdAt, undefined, locale),
          displayViews: formatNumber(article.viewsCount, locale),
          displayLikes: formatNumber(article.likesCount, locale)
        }
      ] as const;
    })
  );

  return (
    <PremiumHomepage
      dictionary={dictionary}
      articles={Array.from(articlesById.values()).slice(0, 6)}
    />
  );
}
