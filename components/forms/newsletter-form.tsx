"use client";

import { useFormState } from "react-dom";
import { Mail } from "lucide-react";

import { newsletterAction } from "@/lib/actions/contact";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm({ dictionary }: { dictionary: Dictionary }) {
  const [state, action] = useFormState(newsletterAction, initialActionState);

  return (
    <form action={action} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="relative">
          <span className="sr-only">{dictionary.forms.email}</span>
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="pl-9 text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
/>
        </label>
        <Button type="submit" variant="gold">
          {dictionary.common.subscribe}
        </Button>
      </div>
      {state.message ? (
        <div
          className={
            state.status === "success"
              ? "rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
              : "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          }
        >
          {state.message}
        </div>
      ) : null}
    </form>
  );
}
