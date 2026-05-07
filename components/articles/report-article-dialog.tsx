"use client";

import { useFormState } from "react-dom";
import { Flag } from "lucide-react";

import { reportArticleAction } from "@/lib/actions/articles";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/forms/submit-button";

export function ReportArticleDialog({
  articleId,
  slug,
  dictionary
}: {
  articleId: string;
  slug: string;
  dictionary: Dictionary;
}) {
  const [state, action] = useFormState(reportArticleAction, initialActionState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Flag className="h-4 w-4" />
          {dictionary.common.report}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dictionary.article.reportTitle}</DialogTitle>
          <DialogDescription>
            {dictionary.article.reportBody}
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <input type="hidden" name="articleId" value={articleId} />
          <input type="hidden" name="slug" value={slug} />
          <Textarea name="reason" placeholder={dictionary.article.reportPlaceholder} required />
          {state.message ? (
            <p className={state.status === "success" ? "text-sm text-emerald-700" : "text-sm text-red-600"}>
              {state.message}
            </p>
          ) : null}
          <SubmitButton variant="destructive" pendingText={dictionary.article.submitReportPending}>
            {dictionary.article.submitReport}
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
