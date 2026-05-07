"use client";

import { useFormState } from "react-dom";

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

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_360px]">
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
              <Input id="title" name="title" defaultValue={defaults?.title ?? ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">{dictionary.forms.subtitle}</Label>
              <Input id="subtitle" name="subtitle" defaultValue={defaults?.subtitle ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="abstract">{dictionary.forms.abstract}</Label>
              <Textarea id="abstract" name="abstract" defaultValue={defaults?.abstract ?? ""} className="min-h-[150px]" required />
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
                required
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
                required
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
                  <SubmitButton name="intent" value="pending_review" variant="gold" pendingText={dictionary.common.submitting}>
                    {dictionary.forms.submitForReview}
                  </SubmitButton>
                  <SubmitButton name="intent" value="draft" variant="outline" pendingText={dictionary.forms.savingDraft}>
                    {dictionary.common.saveDraft}
                  </SubmitButton>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </aside>
    </form>
  );
}
