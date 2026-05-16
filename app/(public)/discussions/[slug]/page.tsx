import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";

import { DiscussionChat } from "@/components/discussions/discussion-chat";
import { getCurrentProfile } from "@/lib/auth";
import { getDiscussionReplies, getDiscussionThreadBySlug } from "@/lib/discussions";
import { getDictionary, getLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function DiscussionThreadPage({ params }: { params: { slug: string } }) {
  const profile = await getCurrentProfile();
  const dictionary = await getDictionary(await getLocale());
  const thread = await getDiscussionThreadBySlug(params.slug);

  if (!thread) notFound();

  const replies = await getDiscussionReplies(thread.id);

  return (
    <div className="min-h-screen bg-background">
      <section className="sticky top-20 z-20 border-b border-border/80 bg-background/90 backdrop-blur-xl">
        <div className="legal-container flex items-center gap-4 py-4">
          <Link href="/discussions" className="rounded-full p-2 text-slate-500 hover:bg-gold/10 hover:text-slate-950 dark:hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
            <MessageCircle className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-slate-950">{thread.title}</h1>
            <p className="text-xs text-slate-500">
              @{thread.author.username} · {replies.length} {dictionary.common.comments}
            </p>
          </div>
        </div>
      </section>

      <main className="legal-container max-w-4xl py-6">
        <div className="premium-panel mb-6 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{dictionary.nav.discussions}</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950 dark:text-white">{thread.title}</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700 dark:text-slate-300">{thread.body}</p>
        </div>

        <DiscussionChat
          threadId={thread.id}
          slug={thread.slug}
          initialReplies={replies}
          currentUser={
            profile
              ? {
                  id: profile.id,
                  fullName: profile.full_name ?? "You",
                  username: profile.username ?? "you",
                  avatarUrl: profile.avatar_url
                }
              : null
          }
        />
      </main>
    </div>
  );
}
