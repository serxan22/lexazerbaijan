import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { DiscussionReplyForm } from "@/components/discussions/discussion-reply-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDiscussionReplies, getDiscussionThreadBySlug } from "@/lib/discussions";
import { getLocale } from "@/lib/i18n";
import { formatDate, initials } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DiscussionThreadPage({ params }: { params: { slug: string } }) {
  const locale = await getLocale();
  const thread = await getDiscussionThreadBySlug(params.slug);

  if (!thread) notFound();

  const replies = await getDiscussionReplies(thread.id);

  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container">
          <Link href="/discussions" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950">
            <ArrowLeft className="h-4 w-4" />
            Back to discussions
          </Link>

          <h1 className="mt-5 font-serif text-5xl font-semibold text-slate-950">{thread.title}</h1>

          <div className="mt-5 flex items-center gap-3 text-sm text-slate-500">
            <Avatar className="h-10 w-10">
              <AvatarImage src={thread.author.avatarUrl ?? undefined} alt={thread.author.fullName} />
              <AvatarFallback>{initials(thread.author.fullName)}</AvatarFallback>
            </Avatar>
            <span>@{thread.author.username}</span>
            <span>{formatDate(thread.createdAt, undefined, locale)}</span>
          </div>

          <p className="mt-6 max-w-3xl whitespace-pre-line text-slate-700">{thread.body}</p>
        </div>
      </section>

      <section className="legal-container grid gap-6 py-8">
        <DiscussionReplyForm threadId={thread.id} slug={thread.slug} />

        <div className="grid gap-4">
          {replies.map((reply) => (
            <article key={reply.id} className="rounded-lg border bg-white p-5">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={reply.author.avatarUrl ?? undefined} alt={reply.author.fullName} />
                  <AvatarFallback>{initials(reply.author.fullName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-slate-950">{reply.author.fullName}</p>
                  <p className="text-xs text-slate-500">{formatDate(reply.createdAt, undefined, locale)}</p>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-700">{reply.content}</p>
            </article>
          ))}

          {!replies.length ? (
            <div className="rounded-lg border border-dashed bg-white p-8 text-center text-sm text-slate-500">
              No replies yet. Be the first to join this discussion.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
