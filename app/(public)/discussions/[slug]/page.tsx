import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";

import { DiscussionChat } from "@/components/discussions/discussion-chat";
import { getCurrentProfile } from "@/lib/auth";
import { getDiscussionReplies, getDiscussionThreadBySlug } from "@/lib/discussions";

export const dynamic = "force-dynamic";

export default async function DiscussionThreadPage({ params }: { params: { slug: string } }) {
  const profile = await getCurrentProfile();
  const thread = await getDiscussionThreadBySlug(params.slug);

  if (!thread) notFound();

  const replies = await getDiscussionReplies(thread.id);

  return (
    <div className="premium-page min-h-screen">
      <section className="sticky top-20 z-20 border-b border-[#d9c79f]/70 bg-white/95 backdrop-blur dark:border-[#b8894a]/20 dark:bg-[#020611]/92">
        <div className="legal-container flex items-center gap-4 py-4">
          <Link href="/categories" className="rounded-full p-2 text-slate-500 hover:bg-[#f5efe5] hover:text-[#8a612f] dark:text-slate-400 dark:hover:bg-[#172033] dark:hover:text-[#f1d79d]">
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="premium-icon flex h-11 w-11 items-center justify-center rounded-full">
            <MessageCircle className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-slate-950">{thread.title}</h1>
            <p className="text-xs text-slate-500">
              Started by @{thread.author.username} · {replies.length} messages
            </p>
          </div>
        </div>
      </section>

      <main className="legal-container max-w-4xl py-6">
        <div className="premium-surface mb-6 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Topic</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950">{thread.title}</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{thread.body}</p>
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
