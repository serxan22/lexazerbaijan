import Link from "next/link";
import { ArrowLeft, MessageSquare, Trash2 } from "lucide-react";

import { deleteCommentAdminAction } from "@/lib/actions/admin";
import { requireRole } from "@/lib/auth";
import { getAdminComments } from "@/lib/data";
import { getLocale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminCommentsPage() {
  await requireRole(["admin"], "/admin/comments");

  const locale = await getLocale();
  const comments = await getAdminComments();

  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container">
          <Button variant="ghost" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
              Back to Admin
            </Link>
          </Button>

          <p className="eyebrow mt-6">Admin</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            Comment Management
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Review and delete comments across all articles.
          </p>
        </div>
      </section>

      <section className="legal-container grid gap-4 py-8">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div>
                  <CardTitle className="text-lg">
                    @{comment.author.username}
                  </CardTitle>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatDate(comment.createdAt, undefined, locale)} · {comment.status}
                  </p>
                  {comment.article.slug ? (
                    <Link
                      href={`/articles/${comment.article.slug}`}
                      className="mt-2 inline-block text-sm font-medium text-blue-700 hover:underline"
                    >
                      {comment.article.title}
                    </Link>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">{comment.article.title}</p>
                  )}
                </div>

                <form action={deleteCommentAdminAction}>
                  <input type="hidden" name="commentId" value={comment.id} />
                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </form>
              </div>
            </CardHeader>

            <CardContent>
              <p className="whitespace-pre-line rounded-md border bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {comment.content}
              </p>
            </CardContent>
          </Card>
        ))}

        {!comments.length ? (
          <div className="rounded-xl border border-dashed bg-white p-10 text-center text-slate-500">
            <MessageSquare className="mx-auto h-10 w-10" />
            <p className="mt-3">No comments found.</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
