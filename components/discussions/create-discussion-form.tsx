"use client";

import { useFormState } from "react-dom";

import { createDiscussionAction } from "@/lib/actions/discussions";
import { initialActionState } from "@/lib/form-state";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreateDiscussionForm() {
  const [state, action] = useFormState(createDiscussionAction, initialActionState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start a Discussion</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <Input name="title" placeholder="Discussion title" required />
          <Textarea name="body" placeholder="Write the topic, question, or issue you want to discuss..." className="min-h-[140px]" required />

          {state.message ? (
            <p className={state.status === "error" ? "text-sm text-red-600" : "text-sm text-emerald-700"}>
              {state.message}
            </p>
          ) : null}

          <SubmitButton pendingText="Creating...">Create Discussion</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
