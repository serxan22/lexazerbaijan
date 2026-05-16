"use client";

import { useFormState } from "react-dom";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
      <div className="lg:col-span-2">
        <div className="premium-panel overflow-hidden p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">{dictionary.forms.submissionWorkflow}</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                {dictionary.forms.articleManuscriptDescription}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
              {[
                dictionary.forms.workflowIdea,
                dictionary.forms.workflowDraft,
                dictionary.forms.workflowSources,
                dictionary.forms.workflowSubmit,
                dictionary.forms.workflowReview
              ].map((step, index, steps) => (
                <span key={step} className="inline-flex items-center gap-2">
                  <span className="inline-flex h-8 items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 text-gold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {step}
                  </span>
                  {index < steps.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" /> : null}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
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
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
               
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
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
               
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
                    className="inline-flex h-11 items-center justify-center rounded-md bg-gold px-6 text-sm font-semibold text-slate-950 transition hover:bg-[#D0A05E]"
                  >
                    {dictionary.forms.submitForReview}
                  </button>

                  <button
                    type="button"
                    onClick={() => openConsent("draft")}
                    className="inline-flex h-11 items-center justify-center rounded-md border border-input px-6 text-sm font-semibold transition hover:bg-gold/10"
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

          <div className="flex items-start gap-3 rounded-xl border bg-slate-50 p-4">
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
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-700" />
                <span className="font-semibold">{dictionary.common.submitting}</span>
              </div>
              <p className="mt-2 text-xs">
                {dictionary.common.submitting}
              </p>
            </div>
          ) : null}

          <DialogFooter>
            <button
              type="button"
              onClick={handleConfirmedSubmit}
              disabled={!consentChecked || consentSubmitting || formSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-md bg-gold px-6 text-sm font-semibold text-slate-950 transition hover:bg-[#D0A05E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {consentSubmitting || formSubmitting ? dictionary.common.submitting : dictionary.forms.acceptAndSubmit}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

</form>
  );
}
