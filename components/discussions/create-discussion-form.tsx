"use client";

import { useFormState } from "react-dom";

import { createDiscussionAction } from "@/lib/actions/discussions";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreateDiscussionForm({ dictionary }: { dictionary: Dictionary }) {
  const [state, action] = useFormState(createDiscussionAction, initialActionState);

  return (
    <Card id="start-discussion">
      <CardHeader>
        <CardTitle>{dictionary.pages.startDiscussion}</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={action} className="space-y-4">
          <Input id="discussion-title-input" name="title" placeholder={dictionary.pages.discussionTitle} required />

          <Textarea
            name="body"
            placeholder="Write the discussion text..."
            className="min-h-[140px]"
            required
          />

          {state.message ? (
            <p className="text-sm text-red-600">{state.message}</p>
          ) : null}

          <SubmitButton pendingText={dictionary.pages.creatingDiscussion}>
            {dictionary.pages.createDiscussion}
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
