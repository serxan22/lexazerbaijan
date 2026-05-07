"use client";

import { useFormState } from "react-dom";

import { addCommentAction } from "@/lib/actions/articles";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { SubmitButton } from "@/components/forms/submit-button";
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

  return (
    <form action={action} className="mt-6 space-y-3">
      <input type="hidden" name="articleId" value={articleId} />
      <input type="hidden" name="slug" value={slug} />
      <Textarea name="content" placeholder={dictionary.article.commentPlaceholder} required />
      {state.message ? (
        <p className={state.status === "success" ? "text-sm text-emerald-700" : "text-sm text-red-600"}>
          {state.message}
        </p>
      ) : null}
      <SubmitButton pendingText={dictionary.common.posting}>{dictionary.article.postComment}</SubmitButton>
    </form>
  );
}
