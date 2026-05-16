import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, BookOpen, Edit3, Eye, FileWarning, Heart, MessageSquare, ShieldCheck, Trash2, Users } from "lucide-react";

import { CategoryForm } from "@/components/admin/category-form";
import { RejectArticleForm } from "@/components/admin/reject-article-form";
import { RoleUpdateForm } from "@/components/admin/role-update-form";
import { StatCard } from "@/components/dashboard/stat-card";
import { approveArticleAction, deleteArticleAdminAction, toggleVerifiedWriterAction } from "@/lib/actions/admin";
import { requireRole } from "@/lib/auth";
import { getAdminOverview, getCategories } from "@/lib/data";
import { getDictionary, getLocale, localizeCategory } from "@/lib/i18n";
import { formatDate, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return { title: dictionary.admin.title };
}

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  await requireRole(["admin"], "/admin");
  const [overview, categories] = await Promise.all([getAdminOverview(), getCategories()]);

  return (
    <div className="premium-page">
      <section className="premium-hero">
        <div className="premium-hero-inner">
          <p className="eyebrow">{dictionary.admin.eyebrow}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950 dark:text-white">{dictionary.admin.title}</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            {dictionary.admin.body}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/admin/comments">
                <MessageSquare className="h-4 w-4" />
                {dictionary.admin.manageComments}
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/admin/discussions">
                <MessageSquare className="h-4 w-4" />
                {dictionary.admin.manageDiscussions}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="legal-container py-8">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label={dictionary.admin.totalUsers} value={overview.stats.totalUsers} icon={Users} locale={locale} />
          <StatCard label={dictionary.admin.totalPublished} value={overview.stats.totalPublishedArticles} icon={BookOpen} locale={locale} />
          <StatCard label={dictionary.common.pending} value={overview.stats.pendingArticles} icon={FileWarning} locale={locale} />
          <StatCard label={dictionary.admin.totalViews} value={overview.stats.totalViews} icon={BarChart3} locale={locale} />
        </div>

        <Tabs defaultValue="pending" className="mt-8">
          <TabsList className="grid h-auto w-full grid-cols-2 md:inline-flex md:w-auto md:grid-cols-none">
            <TabsTrigger value="pending">{dictionary.admin.pendingArticles}</TabsTrigger>
            <TabsTrigger value="all">{dictionary.admin.allArticles}</TabsTrigger>
            <TabsTrigger value="users">{dictionary.admin.users}</TabsTrigger>
            <TabsTrigger value="categories">{dictionary.admin.categories}</TabsTrigger>
            <TabsTrigger value="reports">{dictionary.admin.reports}</TabsTrigger>
            <TabsTrigger value="stats">{dictionary.admin.popular}</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="grid gap-4">
              {overview.pendingArticles.map((article) => (
                <Card key={article.id}>
                  <CardContent className="p-5">
                    <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                          {localizeCategory(article.category, dictionary)?.name ?? dictionary.common.uncategorized} · {dictionary.languages[article.language]} · {formatDate(article.createdAt, undefined, locale)}
                        </p>
                        <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950">{article.title}</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{article.abstract}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <form action={approveArticleAction}>
                            <input type="hidden" name="articleId" value={article.id} />
                            <Button size="sm" variant="gold">
                              <ShieldCheck className="h-4 w-4" />
                              {dictionary.common.approve}
                            </Button>
                          </form>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/articles/${article.id}/edit`}>
                              <Edit3 className="h-4 w-4" />
                              {dictionary.common.edit}
                            </Link>
                          </Button>
                          <form action={deleteArticleAdminAction}>
                            <input type="hidden" name="articleId" value={article.id} />
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4" />
                              {dictionary.common.delete}
                            </Button>
                          </form>
                        </div>
                      </div>
                      <RejectArticleForm articleId={article.id} dictionary={dictionary} />
                    </div>
                  </CardContent>
                </Card>
              ))}
              {!overview.pendingArticles.length ? (
                <div className="rounded-lg border border-dashed bg-white p-10 text-center text-slate-500">
                  {dictionary.admin.noPending}
                </div>
              ) : null}
            </div>
          </TabsContent>


          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{dictionary.admin.allArticles}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {overview.allArticles.map((article) => (
                  <div key={article.id} className="flex flex-col justify-between gap-4 rounded-md border p-4 md:flex-row md:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-slate-950">{article.title}</p>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs uppercase tracking-wide text-slate-600">
                          {article.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {article.author.fullName} · {formatDate(article.updatedAt, undefined, locale)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/articles/${article.slug}`}>
                          <Eye className="h-4 w-4" />
                          {dictionary.common.view}
                        </Link>
                      </Button>

                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/articles/${article.id}/edit`}>
                          <Edit3 className="h-4 w-4" />
                          {dictionary.common.edit}
                        </Link>
                      </Button>

                      <form action={deleteArticleAdminAction}>
                        <input type="hidden" name="articleId" value={article.id} />
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                          {dictionary.common.delete}
                        </Button>
                      </form>
                    </div>
                  </div>
                ))}

                {!overview.allArticles.length ? (
                  <p className="text-sm text-slate-500">{dictionary.pages.noArticlesTitle}</p>
                ) : null}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{dictionary.admin.manageUsers}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {overview.users.map((user) => (
                  <div key={user.id} className="flex flex-col justify-between gap-3 rounded-md border p-4 md:flex-row md:items-center">
                    <div>
                      <p className="font-medium text-slate-950">{user.fullName}</p>
                      <p className="text-sm text-slate-500">@{user.username}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <form action={toggleVerifiedWriterAction}>
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="verified" value={String(user.verifiedWriter ?? false)} />
                        <Button size="sm" variant={user.verifiedWriter ? "gold" : "outline"}>
                          {user.verifiedWriter ? "✓ User Verified" : "Verify Writer"}
                        </Button>
                      </form>

                      <RoleUpdateForm userId={user.id} role={user.role} dictionary={dictionary} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
              <CategoryForm dictionary={dictionary} />
              <Card>
                <CardHeader>
                  <CardTitle>{dictionary.admin.existingCategories}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2">
                  {categories.map((category) => (
                    <div key={category.id} className="rounded-md border p-4">
                      <p className="font-medium text-slate-950">{localizeCategory(category, dictionary)?.name ?? category.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{localizeCategory(category, dictionary)?.description ?? category.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{dictionary.admin.reports}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {overview.reports.map((report) => (
                  <div key={report.id} className="rounded-md border p-4">
                    <div className="flex flex-wrap justify-between gap-3">
                      <p className="font-medium text-slate-950">{report.articleTitle}</p>
                      <span className="text-xs uppercase tracking-[0.14em] text-slate-400">{report.status}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{report.reason}</p>
                    <p className="mt-2 text-xs text-slate-400">{formatDate(report.createdAt, undefined, locale)}</p>
                  </div>
                ))}
                {!overview.reports.length ? <p className="text-sm text-slate-500">{dictionary.common.noReports}</p> : null}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{dictionary.admin.mostPopular}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {overview.stats.mostPopular.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="flex flex-col justify-between gap-3 rounded-md border p-4 transition hover:bg-slate-50 md:flex-row md:items-center"
                  >
                    <div>
                      <p className="font-medium text-slate-950">{article.title}</p>
                      <p className="text-sm text-slate-500">{article.author.fullName}</p>
                    </div>
                    <div className="flex gap-4 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {formatNumber(article.viewsCount, locale)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {formatNumber(article.likesCount, locale)}
                      </span>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
