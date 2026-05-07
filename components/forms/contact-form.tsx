"use client";

import { useFormState } from "react-dom";

import { contactAction } from "@/lib/actions/contact";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({ dictionary }: { dictionary: Dictionary }) {
  const [state, action] = useFormState(contactAction, initialActionState);

  return (
    <form action={action} className="space-y-5 rounded-lg border bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{dictionary.forms.name}</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{dictionary.forms.email}</Label>
          <Input id="email" name="email" type="email" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">{dictionary.forms.subject}</Label>
        <Input id="subject" name="subject" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{dictionary.forms.message}</Label>
        <Textarea id="message" name="message" required className="min-h-[180px]" />
      </div>
      {state.message ? (
        <p className={state.status === "success" ? "text-sm text-emerald-700" : "text-sm text-red-600"}>
          {state.message}
        </p>
      ) : null}
      <SubmitButton pendingText={dictionary.common.sending}>{dictionary.forms.contactSend}</SubmitButton>
    </form>
  );
}
