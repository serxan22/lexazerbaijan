"use client";

import { useFormState } from "react-dom";

import { rejectArticleAction } from "@/lib/actions/admin";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { SubmitButton } from "@/components/forms/submit-button";
import { Textarea } from "@/components/ui/textarea";

export function RejectArticleForm({ articleId, dictionary }: { articleId: string; dictionary: Dictionary }) {
  const [state, action] = useFormState(rejectArticleAction, initialActionState);

  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="articleId" value={articleId} />
      <Textarea name="reason" placeholder={dictionary.admin.rejectionPlaceholder} className="min-h-[90px]" required />
      {state.message ? (
        <p className={state.status === "success" ? "text-xs text-emerald-700" : "text-xs text-red-600"}>
          {state.message}
        </p>
      ) : null}
      <SubmitButton size="sm" variant="outline" pendingText={dictionary.admin.rejecting}>
        {dictionary.common.reject}
      </SubmitButton>
    </form>
  );
}
