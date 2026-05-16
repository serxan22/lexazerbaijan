import Link from "next/link";
import { MessageSquare, PlusCircle } from "lucide-react";

import { CreateDiscussionForm } from "@/components/discussions/create-discussion-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getDiscussionThreads } from "@/lib/discussions";
import { getDictionary, getLocale } from "@/lib/i18n";
import { formatDate, initials } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DiscussionsPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const threads = await getDiscussionThreads();

  return (
    <div className="premium-page">
      <section className="premium-hero">
        <div className="premium-hero-inner">
          <p className="eyebrow">{dictionary.nav.discussions}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950 dark:text-white">{dictionary.nav.discussions}</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            {dictionary.pages.discussionsBody}
          </p>
        </div>
      </section>

      <section className="legal-container grid gap-8 py-8 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-4">
          {threads.length ? (
            threads.map((thread) => (
              <Link key={thread.id} href={`/discussions/${thread.slug}`}>
                <Card className="premium-card">
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={thread.author.avatarUrl ?? undefined} alt={thread.author.fullName} />
                        <AvatarFallback>{initials(thread.author.fullName)}</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 flex-1">
                        <h2 className="font-serif text-2xl font-semibold text-slate-950 dark:text-white">{thread.title}</h2>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{thread.body}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                          <span>@{thread.author.username}</span>
                          <span>{formatDate(thread.updatedAt, undefined, locale)}</span>
                          <span className="inline-flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {thread.repliesCount} {dictionary.common.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <a
              href="#discussion-title-input"
              className="block rounded-lg border border-dashed bg-card/80 p-10 text-center text-slate-500 transition hover:-translate-y-1 hover:border-gold hover:text-slate-800 hover:shadow-sm dark:text-slate-300"
            >
              <PlusCircle className="mx-auto h-10 w-10" />
              <p className="mt-3">{dictionary.pages.noDiscussions}</p>
            </a>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <CreateDiscussionForm dictionary={dictionary} />
        </div>
      </section>
    </div>
  );
}
