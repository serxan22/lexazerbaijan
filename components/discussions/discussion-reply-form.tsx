"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

import { addDiscussionReplyAction } from "@/lib/actions/discussions";
import { initialActionState } from "@/lib/form-state";
import { SubmitButton } from "@/components/forms/submit-button";
import { Textarea } from "@/components/ui/textarea";

export function DiscussionReplyForm({ threadId, slug }: { threadId: string; slug: string }) {
  const [state, action] = useFormState(addDiscussionReplyAction, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={action} className="space-y-3 rounded-lg border bg-white p-4">
      <input type="hidden" name="threadId" value={threadId} />
      <input type="hidden" name="slug" value={slug} />
      <Textarea name="content" placeholder="Write your reply..." className="min-h-[120px]" required />

      {state.message ? (
        <p className={state.status === "error" ? "text-sm text-red-600" : "text-sm text-emerald-700"}>
          {state.message}
        </p>
      ) : null}

      <SubmitButton pendingText="Posting...">Post Reply</SubmitButton>
    </form>
  );
}
