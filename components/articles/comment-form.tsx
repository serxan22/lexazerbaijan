"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

import { addCommentAction } from "@/lib/actions/articles";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CommentForm({
  articleId,
  slug,
  dictionary
}: {
  articleId: string;
  slug: string;
  dictionary: Dictionary;
}) {
  const [state, action] = useFormState(addCommentAction, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <input type="hidden" name="articleId" value={articleId} />
      <input type="hidden" name="slug" value={slug} />

      <Textarea
        name="content"
        placeholder={dictionary.article.commentPlaceholder}
        required
      />

      {state.message ? (
        <p className={state.status === "success" ? "text-sm text-emerald-700" : "text-sm text-red-600"}>
          {state.message}
        </p>
      ) : null}

      <div className="flex items-center justify-end">
        <SubmitButton pendingText={dictionary.common.posting}>
          {dictionary.article.postComment}
        </SubmitButton>
      </div>
    </form>
  );
}
