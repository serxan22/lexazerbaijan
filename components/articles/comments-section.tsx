import { MessageSquare } from "lucide-react";

import { CommentForm } from "@/components/articles/comment-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getArticleComments } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import { formatDate, initials } from "@/lib/utils";

export async function CommentsSection({
  articleId,
  slug,
  dictionary,
  locale
}: {
  articleId: string;
  slug: string;
  dictionary: Dictionary;
  locale: Locale;
}) {
  const comments = await getArticleComments(articleId);

  return (
    <section className="mt-16 rounded-lg border bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-800">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-950">{dictionary.common.comments}</h2>
          <p className="text-sm text-slate-500">{dictionary.article.commentsBody}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {comments.length ? (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-md border bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={comment.author.avatarUrl ?? undefined} alt={comment.author.fullName} />
                  <AvatarFallback>{initials(comment.author.fullName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-slate-900">{comment.author.fullName}</p>
                  <p className="text-xs text-slate-500">{formatDate(comment.createdAt, undefined, locale)}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">{comment.content}</p>
            </article>
          ))
        ) : (
          <div className="rounded-md border border-dashed p-6 text-sm text-slate-500">
            {dictionary.article.noComments}
          </div>
        )}
      </div>

      <CommentForm articleId={articleId} slug={slug} dictionary={dictionary} />
    </section>
  );
}
