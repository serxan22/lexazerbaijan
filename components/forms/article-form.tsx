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

  function openConsent(intent: "pending_review" | "draft") {
    setPendingIntent(intent);
    setConsentOpen(true);
  }

  function handleConfirmedSubmit() {
    if (!consentChecked || !pendingIntent || !formRef.current) return;

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "intent";
    hiddenInput.value = pendingIntent;

    formRef.current.appendChild(hiddenInput);

    formRef.current.requestSubmit();

    setConsentOpen(false);
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
                    className="inline-flex h-11 items-center justify-center rounded-md bg-[#C6A55C] px-6 text-sm font-medium text-black transition hover:opacity-90"
                  >
                    {dictionary.forms.submitForReview}
                  </button>

                  <button
                    type="button"
                    onClick={() => openConsent("draft")}
                    className="inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-medium transition hover:bg-slate-50"
                  >
                    {dictionary.common.saveDraft}
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </aside>
    
      <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Copyright & Author Confirmation
            </DialogTitle>

            <DialogDescription className="pt-3 text-sm leading-7 text-slate-600">
              By submitting this article, you confirm that:
              <br /><br />
              • the article is your original work or properly licensed;
              <br />
              • you have the right to publish the submitted material;
              <br />
              • the submission does not infringe copyright or third-party rights;
              <br />
              • citations and references are properly attributed;
              <br />
              • AI-assisted writing, if used, has been meaningfully reviewed by a human author;
              <br />
              • you agree to the LexAzerbaijan Copyright Policy, AI Content Policy, and Author Agreement.
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
              I confirm that I have read and accepted the copyright,
              authorship, and AI content policies of LexAzerbaijan.
            </label>
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={handleConfirmedSubmit}
              disabled={!consentChecked}
              className="inline-flex h-11 items-center justify-center rounded-md bg-[#C6A55C] px-6 text-sm font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Accept & Submit
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

</form>
  );
}
