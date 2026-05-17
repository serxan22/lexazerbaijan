"use client";

import { Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

import { addDiscussionReplyAction } from "@/lib/actions/discussions";
import { initialActionState } from "@/lib/form-state";

export function DiscussionReplyForm({ threadId, slug }: { threadId: string; slug: string }) {
  const [state, action] = useFormState(addDiscussionReplyAction, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={action} className="flex items-end gap-2">
      <input type="hidden" name="threadId" value={threadId} />
      <input type="hidden" name="slug" value={slug} />

      <textarea
        name="content"
        placeholder="Write a message..."
        className="premium-input min-h-[46px] flex-1 resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-[#b8894a]"
        required
      />

      <button
        type="submit"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#b8894a] text-white transition hover:bg-[#a77738]"
        aria-label="Send message"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}
