import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleForm } from "@/components/forms/article-form";
import { requireRole } from "@/lib/auth";
import { getArticleForAdminEdit, getCategories } from "@/lib/data";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return { title: dictionary.admin.editSubmission };
}

export const dynamic = "force-dynamic";

export default async function AdminEditArticlePage({ params }: { params: { id: string } }) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  await requireRole(["editor", "admin"], `/admin/articles/${params.id}/edit`);
  const [article, categories] = await Promise.all([getArticleForAdminEdit(params.id), getCategories()]);

  if (!article) notFound();

  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-12">
        <div className="legal-container">
          <p className="eyebrow">{dictionary.admin.adminEdit}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">{dictionary.admin.editSubmission}</h1>
          <p className="mt-4 max-w-2xl text-slate-600">{dictionary.admin.editBody}</p>
        </div>
      </section>
      <section className="legal-container py-8">
        <ArticleForm
          mode="admin"
          categories={categories}
          dictionary={dictionary}
          defaults={{
            id: article.id,
            title: article.title,
            subtitle: article.subtitle,
            abstract: article.abstract,
            content: article.content,
            coverImageUrl: article.cover_image_url,
            categoryId: article.category_id,
            language: article.language ?? "en",
            tags: article.article_tags
              ?.map((item) => (Array.isArray(item.tags) ? item.tags[0]?.name : item.tags?.name))
              .filter(Boolean) as string[] | undefined,
            status: article.status
          }}
        />
      </section>
    </div>
  );
}
