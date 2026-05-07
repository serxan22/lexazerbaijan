"use client";

import { useFormState } from "react-dom";

import { updateUserRoleAction } from "@/lib/actions/admin";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import type { UserRole } from "@/types/database";
import { SubmitButton } from "@/components/forms/submit-button";

export function RoleUpdateForm({
  userId,
  role,
  dictionary
}: {
  userId: string;
  role: UserRole;
  dictionary: Dictionary;
}) {
  const [state, action] = useFormState(updateUserRoleAction, initialActionState);

  return (
    <form action={action} className="flex items-center gap-2">
      <input type="hidden" name="userId" value={userId} />
      <select
        name="role"
        defaultValue={role}
        className="h-9 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="user">{dictionary.roles.user}</option>
        <option value="author">{dictionary.roles.author}</option>
        <option value="editor">{dictionary.roles.editor}</option>
        <option value="admin">{dictionary.roles.admin}</option>
      </select>
      <SubmitButton size="sm" variant="outline" pendingText={dictionary.common.saving}>
        {dictionary.common.save}
      </SubmitButton>
      {state.message ? <span className="text-xs text-slate-500">{state.message}</span> : null}
    </form>
  );
}
