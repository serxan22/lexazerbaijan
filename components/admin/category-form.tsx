"use client";

import { useFormState } from "react-dom";

import { createCategoryAction } from "@/lib/actions/admin";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CategoryForm({ dictionary }: { dictionary: Dictionary }) {
  const [state, action] = useFormState(createCategoryAction, initialActionState);

  return (
    <form action={action} className="space-y-3 rounded-lg border bg-white p-5">
      <Input name="name" placeholder={dictionary.admin.categoryName} required />
      <Textarea name="description" placeholder={dictionary.admin.categoryDescription} />
      {state.message ? (
        <p className={state.status === "success" ? "text-sm text-emerald-700" : "text-sm text-red-600"}>
          {state.message}
        </p>
      ) : null}
      <SubmitButton variant="gold" pendingText={dictionary.admin.savingCategory}>
        {dictionary.admin.saveCategory}
      </SubmitButton>
    </form>
  );
}
