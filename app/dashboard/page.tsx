import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Bookmark, Eye, Heart, MessageSquare, PenSquare, UserRound } from "lucide-react";

import { DashboardArticleList } from "@/components/dashboard/dashboard-article-list";
import { StatCard } from "@/components/dashboard/stat-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireProfile } from "@/lib/auth";
import { getUserArticles } from "@/lib/data";
import { getDictionary, getLocale } from "@/lib/i18n";
import { initials } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return { title: dictionary.dashboard.title };
}

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const { user, profile } = await requireProfile("/dashboard");
  const articles = await getUserArticles(user.id);
  const totalViews = articles.reduce((sum, article) => sum + article.viewsCount, 0);
  const totalLikes = articles.reduce((sum, article) => sum + article.likesCount, 0);
  const totalComments = articles.reduce((sum, article) => sum + article.commentsCount, 0);

  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar_url ?? undefined} alt={profile.full_name ?? dictionary.dashboard.profile} />
              <AvatarFallback>{initials(profile.full_name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="eyebrow">{dictionary.dashboard.title}</p>
              <h1 className="mt-2 font-serif text-4xl font-semibold text-slate-950">
                {profile.full_name ?? "Your profile"}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="blue">{profile.role}</Badge>
                <span className="text-sm text-slate-500">{profile.workplace ?? profile.university ?? dictionary.site.legalContributor}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/profile-setup">
                <UserRound className="h-4 w-4" />
                {dictionary.dashboard.editProfile}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/bookmarks">
                <Bookmark className="h-4 w-4" />
                Saved Articles
              </Link>
            </Button>

            <Button variant="gold" asChild>
              <Link href="/submit">
                <PenSquare className="h-4 w-4" />
                {dictionary.dashboard.newArticle}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="legal-container py-8">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label={dictionary.dashboard.submittedArticles} value={articles.length} icon={BookOpen} locale={locale} />
          <StatCard label={dictionary.common.views} value={totalViews} icon={Eye} locale={locale} />
          <StatCard label={dictionary.common.likes} value={totalLikes} icon={Heart} locale={locale} />
          <StatCard label={dictionary.common.comments} value={totalComments} icon={MessageSquare} locale={locale} />
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="font-serif text-2xl font-semibold text-slate-950">{dictionary.dashboard.profile}</h2>
            <div className="mt-4 grid gap-4 text-sm text-slate-600 md:grid-cols-3">
              <p>
                <span className="block font-medium text-slate-900">{dictionary.forms.username}</span>
                @{profile.username}
              </p>
              <p>
                <span className="block font-medium text-slate-900">{dictionary.forms.university}</span>
                {profile.university ?? dictionary.dashboard.notSet}
              </p>
              <p>
                <span className="block font-medium text-slate-900">{dictionary.forms.workplace}</span>
                {profile.workplace ?? dictionary.dashboard.notSet}
              </p>
            </div>
            {profile.bio ? <p className="mt-4 text-sm leading-6 text-slate-600">{profile.bio}</p> : null}
          </CardContent>
        </Card>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-3xl font-semibold text-slate-950">{dictionary.dashboard.submissions}</h2>
          </div>
          <DashboardArticleList articles={articles} dictionary={dictionary} locale={locale} />
        </div>
      </section>
    </div>
  );
}
