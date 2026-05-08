"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { formatDate, initials } from "@/lib/utils";

type ChatProfile = {
  id?: string;
  fullName: string;
  username: string;
  avatarUrl: string | null;
};

type ChatReply = {
  id: string;
  content: string;
  userId?: string;
  createdAt: string;
  author: ChatProfile;
  pending?: boolean;
};

export function DiscussionChat({
  threadId,
  slug,
  initialReplies,
  currentUser
}: {
  threadId: string;
  slug: string;
  initialReplies: ChatReply[];
  currentUser: ChatProfile | null;
}) {
  const supabase = createClient();
  const [replies, setReplies] = useState<ChatReply[]>(initialReplies);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  function scrollBottom() {
    window.setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  useEffect(() => {
    scrollBottom();
  }, [replies.length]);

  useEffect(() => {
    const channel = supabase
      .channel(`discussion-chat-${threadId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "discussion_replies",
          filter: `thread_id=eq.${threadId}`
        },
        async (payload) => {
          const row = payload.new as any;

          setReplies((current) => {
            if (current.some((reply) => reply.id === row.id)) return current;
            return current;
          });

          const { data: profile } = await supabase
            .from("profiles")
            .select("id, full_name, username, avatar_url")
            .eq("id", row.user_id)
            .maybeSingle();

          const reply: ChatReply = {
            id: row.id,
            content: row.content,
            userId: row.user_id,
            createdAt: row.created_at,
            author: {
              id: profile?.id ?? row.user_id,
              fullName: profile?.full_name ?? "LexAzerbaijan user",
              username: profile?.username ?? "user",
              avatarUrl: profile?.avatar_url ?? null
            }
          };

          setReplies((current) => {
            if (current.some((item) => item.id === reply.id)) return current;
            return [...current.filter((item) => !item.pending), reply];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, threadId]);

  async function sendMessage() {
    const content = message.trim();
    if (!content || sending) return;

    if (!currentUser?.id) {
      window.location.href = `/login?next=/discussions/${slug}`;
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const optimistic: ChatReply = {
      id: tempId,
      content,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      author: currentUser,
      pending: true
    };

    setReplies((current) => [...current, optimistic]);
    setMessage("");
    setSending(true);

    const { data, error } = await supabase
      .from("discussion_replies")
      .insert({
        thread_id: threadId,
        user_id: currentUser.id,
        content
      })
      .select("id, content, user_id, created_at")
      .single();

    await supabase
      .from("discussion_threads")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", threadId);

    setSending(false);

    if (error || !data) {
      setReplies((current) => current.filter((reply) => reply.id !== tempId));
      setMessage(content);
      alert(error?.message ?? "Message failed.");
      return;
    }

    setReplies((current) =>
      current.map((reply) =>
        reply.id === tempId
          ? {
              id: data.id,
              content: data.content,
              userId: data.user_id,
              createdAt: data.created_at,
              author: currentUser
            }
          : reply
      )
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="space-y-4">
        {replies.map((reply) => {
          const isMine = currentUser?.id && reply.userId === currentUser.id;

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
                    {isMine ? "You" : reply.author.fullName} · {formatDate(reply.createdAt)}
                    {reply.pending ? " · sending..." : ""}
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

        <div ref={bottomRef} />
      </div>

      <div className="mt-6 flex items-end gap-2 border-t pt-4">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Write a message..."
          className="min-h-[46px] flex-1 resize-none rounded-2xl border bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:bg-white"
        />

        <button
          type="button"
          onClick={sendMessage}
          disabled={sending || !message.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700 disabled:opacity-50"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
