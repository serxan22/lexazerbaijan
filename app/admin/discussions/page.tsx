import Link from "next/link";
import { ArrowLeft, MessageSquare, Trash2 } from "lucide-react";

import { deleteDiscussionReplyAdminAction, deleteDiscussionThreadAdminAction } from "@/lib/actions/admin";
import { requireRole } from "@/lib/auth";
import { getAdminDiscussionThreads } from "@/lib/discussions";
import { getLocale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminDiscussionsPage() {
  await requireRole(["admin"], "/admin/discussions");

  const locale = await getLocale();
  const threads = await getAdminDiscussionThreads();

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
            Discussion Management
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Delete discussion rooms or individual messages from one place.
          </p>
        </div>
      </section>

      <section className="legal-container grid gap-5 py-8">
        {threads.map((thread) => (
          <Card key={thread.id}>
            <CardHeader>
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <CardTitle>{thread.title}</CardTitle>
                  <p className="mt-2 text-sm text-slate-500">
                    @{thread.author.username} · {formatDate(thread.createdAt, undefined, locale)} · {thread.replies.length} messages
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm text-slate-600">{thread.body}</p>
                </div>

                <form action={deleteDiscussionThreadAdminAction}>
                  <input type="hidden" name="threadId" value={thread.id} />
                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                    Delete Room
                  </Button>
                </form>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-2">
                {thread.replies.map((reply: { id: string; content: string; createdAt: string; author: { username: string } }) => (
                  <div key={reply.id} className="flex flex-col justify-between gap-3 rounded-md border bg-slate-50 p-3 md:flex-row md:items-center">
                    <div>
                      <p className="text-sm text-slate-700">{reply.content}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        @{reply.author.username} · {formatDate(reply.createdAt, undefined, locale)}
                      </p>
                    </div>

                    <form action={deleteDiscussionReplyAdminAction}>
                      <input type="hidden" name="replyId" value={reply.id} />
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </form>
                  </div>
                ))}

                {!thread.replies.length ? (
                  <div className="rounded-md border border-dashed p-4 text-sm text-slate-500">
                    No messages in this room yet.
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}

        {!threads.length ? (
          <div className="rounded-xl border border-dashed bg-white p-10 text-center text-slate-500">
            <MessageSquare className="mx-auto h-10 w-10" />
            <p className="mt-3">No discussions yet.</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
