"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Send } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { createClient } from "@/lib/supabase/client";
import { formatDate, initials } from "@/lib/utils";

type ChatProfile = {
  id?: string;
  fullName: string;
  username: string;
  avatarUrl: string | null;
  verifiedWriter?: boolean;
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
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [sending, setSending] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  function scrollBottom() {
    // Disabled: keep the page position stable after sending messages.
  }


  useEffect(() => {
    scrollBottom();
  }, [replies.length]);

  useEffect(() => {
    const channel = supabase.channel(`discussion-room-${threadId}`, {
      config: {
        presence: {
          key: currentUser?.id ?? `guest-${Math.random()}`
        }
      }
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const users = Object.values(state)
          .flat()
          .map((item: any) => item.username)
          .filter(Boolean);

        setOnlineUsers(Array.from(new Set(users)));
      })
      .on("broadcast", { event: "typing" }, ({ payload }) => {
        if (!payload?.username || payload.username === currentUser?.username) return;

        setTypingUsers((current) => {
          if (current.includes(payload.username)) return current;
          return [...current, payload.username];
        });

        window.setTimeout(() => {
          setTypingUsers((current) => current.filter((item) => item !== payload.username));
        }, 1600);
      })
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "discussion_replies",
          filter: `thread_id=eq.${threadId}`
        },
        async (payload) => {
          if (payload.eventType === "DELETE") {
            const oldRow = payload.old as any;
            setReplies((current) => current.filter((reply) => reply.id !== oldRow.id));
            return;
          }

          const row = payload.new as any;

          if (payload.eventType === "UPDATE") {
            setReplies((current) =>
              current.map((reply) =>
                reply.id === row.id
                  ? { ...reply, content: row.content, createdAt: row.updated_at ?? reply.createdAt }
                  : reply
              )
            );
            return;
          }

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
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED" && currentUser?.id) {
          await channel.track({
            userId: currentUser.id,
            username: currentUser.username,
            fullName: currentUser.fullName,
            onlineAt: new Date().toISOString()
          });
        }
      });

    return () => {
      channel.untrack();
      supabase.removeChannel(channel);
    };
  }, [supabase, threadId, currentUser?.id, currentUser?.username, currentUser?.fullName]);

  async function deleteMessage(replyId: string) {
    const previousReplies = replies;

    setReplies((current) => current.filter((reply) => reply.id !== replyId));
    setOpenMenuId(null);

    try {
      const { error } = await supabase
        .from("discussion_replies")
        .delete()
        .eq("id", replyId);

      if (error) {
        setReplies(previousReplies);
        return;
      }
    } catch {
      setReplies(previousReplies);
    }
  }

  async function saveEditedMessage(replyId: string) {
    const content = editingValue.trim();
    if (!content) return;

    const previous = replies;

    setReplies((current) =>
      current.map((reply) =>
        reply.id === replyId ? { ...reply, content } : reply
      )
    );

    setEditingId(null);
    setEditingValue("");

    const { error } = await supabase
      .from("discussion_replies")
      .update({
        content,
        updated_at: new Date().toISOString()
      })
      .eq("id", replyId);

    if (error) {
      setReplies(previous);
      alert(error.message);
    }
  }

  async function sendMessage() {
    const preservedScrollY = window.scrollY;
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
    const currentScrollY = window.scrollY;
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

    const { data: thread } = await supabase
      .from("discussion_threads")
      .select("author_id, title")
      .eq("id", threadId)
      .maybeSingle();

    if (thread?.author_id && thread.author_id !== currentUser.id) {
      await supabase.from("notifications").insert({
        user_id: thread.author_id,
        actor_id: currentUser.id,
        type: "discussion_reply",
        title: "New reply in your discussion",
        body: `${currentUser.fullName} replied to: ${thread.title}`,
        href: `/discussions/${slug}`
      });
    }

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
    <div className="premium-surface p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#d9c79f]/60 pb-3 dark:border-[#b8894a]/20">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {onlineUsers.length} online
          </p>

          <div className="mt-1 flex flex-wrap gap-2">
            {onlineUsers.map((user) => (
              <span
                key={user}
                className="inline-flex items-center gap-1 rounded-full border border-[#d9c79f]/60 bg-[#f5efe5] px-2 py-1 text-xs font-medium text-[#6f4c20] dark:border-[#b8894a]/20 dark:bg-[#172033] dark:text-[#f1d79d]"
              >
                <span className="h-2 w-2 rounded-full bg-[#b8894a]" />
                {user}
              </span>
            ))}
          </div>
        </div>

        {typingUsers.length ? (
          <div className="text-xs text-slate-500">
            {typingUsers.join(", ")} typing...
          </div>
        ) : null}
      </div>

      <div className="max-h-[55vh] min-h-[260px] space-y-4 overflow-y-auto overscroll-contain pr-2">
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
                      ? "rounded-2xl rounded-tr-sm bg-[#0B1220] px-4 py-3 text-white shadow-sm dark:bg-[#f3d28d] dark:text-[#0B1220]"
                      : "rounded-2xl rounded-tl-sm border border-[#d9c79f]/70 bg-[#f8fafc] px-4 py-3 text-slate-800 shadow-sm dark:border-[#b8894a]/20 dark:bg-[#0b1728] dark:text-slate-200"
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className={isMine ? "mb-1 text-xs text-[#f1d79d] dark:text-[#6f4c20]" : "mb-1 text-xs text-slate-500 dark:text-slate-400"}>
                      <span className="inline-flex items-center gap-1">
                        {isMine ? "You" : reply.author.fullName}
                        {reply.author.verifiedWriter ? <VerifiedBadge /> : null}
                      </span>{" "}
                      · {formatDate(reply.createdAt)}
                      {reply.pending ? " · sending..." : ""}
                    </div>

                    {isMine && !reply.pending ? (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setOpenMenuId(openMenuId === reply.id ? null : reply.id)}
                          className={isMine ? "rounded-full p-1 text-[#f1d79d] hover:bg-[#172033] dark:text-[#6f4c20] dark:hover:bg-[#fff8e8]" : "rounded-full p-1 text-slate-500 hover:bg-[#f5efe5] dark:text-slate-400 dark:hover:bg-[#172033]"}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>

                        {openMenuId === reply.id ? (
                          <div className="absolute right-0 top-7 z-30 w-28 rounded-md border border-[#d9c79f]/70 bg-white p-1 text-sm text-slate-800 shadow-lg dark:border-[#b8894a]/20 dark:bg-[#07111f] dark:text-slate-100">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(reply.id);
                                setEditingValue(reply.content);
                                setOpenMenuId(null);
                              }}
                              className="w-full rounded px-3 py-2 text-left hover:bg-[#f5efe5] dark:hover:bg-[#172033]"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteMessage(reply.id)}
                              className="w-full rounded px-3 py-2 text-left text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  {editingId === reply.id ? (
                    <div className="mt-2 space-y-2">
                      <textarea
                        value={editingValue}
                        onChange={(event) => setEditingValue(event.target.value)}
                        className="premium-input min-h-[80px] w-full rounded-md border p-2 text-sm"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => saveEditedMessage(reply.id)}
                          className="rounded bg-white px-3 py-1 text-xs font-medium text-[#8a612f] dark:bg-[#07111f] dark:text-[#f1d79d]"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setEditingValue("");
                          }}
                          className="rounded bg-white/70 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line text-sm leading-6">{reply.content}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {!replies.length ? (
          <div className="premium-panel border-dashed p-8 text-center text-sm text-slate-500 dark:text-slate-400">
            No messages yet. Start the discussion.
          </div>
        ) : null}

        <div ref={bottomRef} />
      </div>

      <div className="mt-4 shrink-0 flex items-end gap-2 border-t border-[#d9c79f]/60 pt-4 dark:border-[#b8894a]/20">
        <textarea
          ref={messageInputRef}
          value={message}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.stopPropagation();

              const scrollY = window.scrollY;
              sendMessage();

              window.requestAnimationFrame(() => {
                window.scrollTo({ top: scrollY, behavior: "auto" });
                messageInputRef.current?.focus({ preventScroll: true });
              });
            }
          }}
          onChange={(event) => {
            setMessage(event.target.value);

            if (currentUser?.username) {
              supabase.channel(`discussion-room-${threadId}`).send({
                type: "broadcast",
                event: "typing",
                payload: { username: currentUser.username }
              });

              if (typingTimeout.current) {
                clearTimeout(typingTimeout.current);
              }
            }
          }}
          placeholder="Write a message..."
          className="premium-input min-h-[46px] flex-1 resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-[#b8894a]"
        />

        <button
          type="button"
          onClick={sendMessage}
          disabled={sending || !message.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#b8894a] text-white transition hover:bg-[#a77738] disabled:opacity-50"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
