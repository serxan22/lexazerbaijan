import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";

import { DiscussionReplyForm } from "@/components/discussions/discussion-reply-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDiscussionReplies, getDiscussionThreadBySlug } from "@/lib/discussions";
import { getCurrentProfile } from "@/lib/auth";
import { getLocale } from "@/lib/i18n";
import { formatDate, initials } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DiscussionThreadPage({ params }: { params: { slug: string } }) {
  const locale = await getLocale();
  const profile = await getCurrentProfile();
  const thread = await getDiscussionThreadBySlug(params.slug);

  if (!thread) notFound();

  const replies = await getDiscussionReplies(thread.id);

  return (
    <div className="min-h-screen bg-slate-100">
      <section className="sticky top-20 z-20 border-b bg-white/95 backdrop-blur">
        <div className="legal-container flex items-center gap-4 py-4">
          <Link href="/discussions" className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950">
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-700">
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
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="mb-6 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Topic</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950">{thread.title}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{thread.body}</p>
          </div>

          <div className="space-y-4">
            {replies.map((reply) => {
              const isMine = profile?.username && reply.author.username === profile.username;

              return (
                <div key={reply.id} className={isMine ? "flex justify-end" : "flex justify-start"}>
                  <div className={isMine ? "flex max-w-[78%] flex-row-reverse gap-2" : "flex max-w-[78%] gap-2"}>
                    <Avatar className="mt-1 h-8 w-8 shrink-0">
                      <AvatarImage src={reply.author.avatarUrl ?? undefined} alt={reply.author.fullName} />
                      <AvatarFallback>{initials(reply.author.fullName)}</AvatarFallback>
                    </Avatar>

                    <div
                      className={
                        isMine
                          ? "rounded-2xl rounded-tr-sm bg-green-600 px-4 py-3 text-white shadow-sm"
                          : "rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-slate-800 shadow-sm"
                      }
                    >
                      <div className={isMine ? "mb-1 text-xs text-green-100" : "mb-1 text-xs text-slate-500"}>
                        {isMine ? "You" : reply.author.fullName} · {formatDate(reply.createdAt, undefined, locale)}
                      </div>
                      <p className="whitespace-pre-line text-sm leading-6">{reply.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {!replies.length ? (
              <div className="rounded-xl border border-dashed bg-slate-50 p-8 text-center text-sm text-slate-500">
                No messages yet. Start the discussion.
              </div>
            ) : null}
          </div>

          <div className="mt-6 border-t pt-4">
            <DiscussionReplyForm threadId={thread.id} slug={thread.slug} />
          </div>
        </div>
      </main>
    </div>
  );
}
