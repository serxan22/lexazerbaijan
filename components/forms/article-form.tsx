"use client";

import { useFormState } from "react-dom";
import { useRef, useState } from "react";

import { submitArticleAction, updateArticleAction } from "@/lib/actions/articles";
import { updateArticleAdminAction } from "@/lib/actions/admin";
import type { CategorySummary } from "@/lib/content-types";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { localizeCategory } from "@/lib/i18n";
import { locales } from "@/lib/i18n-config";
import type { ArticleLanguage, ArticleStatus } from "@/types/database";
import { RichTextEditor } from "@/components/forms/rich-text-editor";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type ArticleFormDefaults = {
  id?: string;
  title?: string;
  subtitle?: string | null;
  categoryId?: string | null;
  language?: ArticleLanguage | null;
  tags?: string[];
  abstract?: string;
  content?: string;
  coverImageUrl?: string | null;
  status?: ArticleStatus;
};

export function ArticleForm({
  categories,
  defaults,
  mode = "create",
  dictionary
}: {
  categories: CategorySummary[];
  defaults?: ArticleFormDefaults;
  mode?: "create" | "edit" | "admin";
  dictionary: Dictionary;
}) {
  const actionToUse =
    mode === "admin" ? updateArticleAdminAction : mode === "edit" ? updateArticleAction : submitArticleAction;
  const [state, action] = useFormState(actionToUse, initialActionState);

  const formRef = useRef<HTMLFormElement>(null);

  const [consentOpen, setConsentOpen] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [pendingIntent, setPendingIntent] = useState<"pending_review" | "draft" | null>(null);
  const [consentSubmitting, setConsentSubmitting] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  function openConsent(intent: "pending_review" | "draft") {
    if (formSubmitting || consentSubmitting) return;

    setPendingIntent(intent);
    setConsentSubmitting(false);
    setFormSubmitting(false);
    setConsentOpen(true);
  }

  function handleConfirmedSubmit() {
    if (!consentChecked || !pendingIntent || !formRef.current || consentSubmitting || formSubmitting) return;

    setConsentSubmitting(true);
    setFormSubmitting(true);

    formRef.current
      .querySelectorAll('input[name="intent"][data-consent-intent="true"]')
      .forEach((input) => input.remove());

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "intent";
    hiddenInput.value = pendingIntent;
    hiddenInput.dataset.consentIntent = "true";

    formRef.current.appendChild(hiddenInput);

    window.setTimeout(() => {
      formRef.current?.requestSubmit();
    }, 50);
  }

  return (
    <form ref={formRef} action={action} className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {defaults?.id ? <input type="hidden" name="id" value={defaults.id} /> : null}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.forms.articleManuscript}</CardTitle>
            <CardDescription>{dictionary.forms.articleManuscriptDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">{dictionary.forms.title}</Label>
              <Input id="title" name="title" defaultValue={defaults?.title ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">{dictionary.forms.subtitle}</Label>
              <Input id="subtitle" name="subtitle" defaultValue={defaults?.subtitle ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="abstract">{dictionary.forms.abstract}</Label>
              <Textarea id="abstract" name="abstract" defaultValue={defaults?.abstract ?? ""} className="min-h-[150px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">{dictionary.forms.content}</Label>
              <RichTextEditor name="content" defaultValue={defaults?.content ?? ""} placeholder={dictionary.forms.contentPlaceholder} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sources">{dictionary.forms.sources}</Label>
              <Textarea id="sources" name="sources" className="min-h-[160px]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <aside className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.forms.publicationDetails}</CardTitle>
            <CardDescription>{dictionary.forms.publicationDetailsDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="categoryId">{dictionary.forms.category}</Label>
              <select
                id="categoryId"
                name="categoryId"
                defaultValue={defaults?.categoryId ?? ""}
                className="premium-input h-10 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8894a]"
               
              >
                <option value="" disabled>
                  {dictionary.forms.selectCategory}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                  {localizeCategory(category, dictionary)?.name ?? category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">{dictionary.forms.articleLanguage}</Label>
              <select
                id="language"
                name="language"
                defaultValue={defaults?.language ?? "az"}
                className="premium-input h-10 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8894a]"
               
              >
                {locales.map((language) => (
                  <option key={language} value={language}>
                    {dictionary.languages[language]}
                  </option>
                ))}
              </select>
              <p className="text-xs leading-5 text-slate-500">{dictionary.forms.articleLanguageDescription}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">{dictionary.forms.tags}</Label>
              <Input id="tags" name="tags" defaultValue={defaults?.tags?.join(", ") ?? ""} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverImage">{dictionary.forms.uploadCover}</Label>
              <Input id="coverImage" name="coverImage" type="file" accept="image/png,image/jpeg,image/webp" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImageUrl">{dictionary.forms.coverUrl}</Label>
              <Input id="coverImageUrl" name="coverImageUrl" defaultValue={defaults?.coverImageUrl ?? ""} />
            </div>
            {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}
            <div className="grid gap-3">
              {mode === "admin" ? (
                <SubmitButton variant="gold" pendingText={dictionary.forms.savingChanges}>
                  {dictionary.forms.saveEditorialChanges}
                </SubmitButton>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openConsent("pending_review")}
                    className="inline-flex h-11 items-center justify-center rounded-md bg-[#b8894a] px-6 text-sm font-semibold text-white transition hover:bg-[#a77738]"
                  >
                    {dictionary.forms.submitForReview}
                  </button>

                  <button
                    type="button"
                    onClick={() => openConsent("draft")}
                    className="inline-flex h-11 items-center justify-center rounded-md border border-[#d9c79f]/80 bg-white px-6 text-sm font-semibold text-[#243044] transition hover:bg-[#fff8e8] dark:border-[#b8894a]/30 dark:bg-[#0b1728] dark:text-slate-100 dark:hover:bg-[#111f34]"
                  >
                    {dictionary.common.saveDraft}
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </aside>
    
      <Dialog
        open={consentOpen}
        onOpenChange={(open) => {
          if (!consentSubmitting && !formSubmitting) setConsentOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {dictionary.forms.consentTitle}
            </DialogTitle>

            <DialogDescription className="pt-3 text-sm leading-7 text-slate-600">
              {dictionary.forms.consentDescription}
              <br /><br />
              • {dictionary.forms.consentOriginal}
              <br />
              • {dictionary.forms.consentRights}
              <br />
              • {dictionary.forms.consentNoInfringement}
              <br />
              • {dictionary.forms.consentCitations}
              <br />
              • {dictionary.forms.consentAiReview}
              <br />
              • {dictionary.forms.consentPolicies}
            </DialogDescription>
          </DialogHeader>

          <div className="premium-panel flex items-start gap-3 p-4">
            <input
              id="copyright-consent"
              type="checkbox"
              checked={consentChecked}
              onChange={(event) => setConsentChecked(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300"
            />

            <label
              htmlFor="copyright-consent"
              className="text-sm leading-6 text-slate-700"
            >
              {dictionary.forms.consentCheckbox}
            </label>
          </div>

          {(consentSubmitting || formSubmitting) ? (
            <div className="rounded-xl border border-[#d9c79f]/70 bg-[#f5efe5] p-4 text-sm leading-6 text-[#6f4c20] dark:border-[#b8894a]/25 dark:bg-[#172033] dark:text-[#f1d79d]">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#d9c79f] border-t-[#b8894a]" />
                <span className="font-semibold">{dictionary.common.submitting}</span>
              </div>
              <p className="mt-2 text-xs">
                Your article is being submitted. Please wait and do not click again.
              </p>
            </div>
          ) : null}

          <DialogFooter>
            <button
              type="button"
              onClick={handleConfirmedSubmit}
              disabled={!consentChecked || consentSubmitting || formSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-md bg-[#b8894a] px-6 text-sm font-semibold text-white transition hover:bg-[#a77738] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {consentSubmitting || formSubmitting ? dictionary.common.submitting : dictionary.forms.acceptAndSubmit}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

</form>
  );
}
