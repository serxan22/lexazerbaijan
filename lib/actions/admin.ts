"use server";

import { revalidatePath } from "next/cache";

import { formString } from "@/lib/form-data";
import { optionalFormString, splitCommaList } from "@/lib/form-data";
import type { ActionState } from "@/lib/form-state";
import { zodErrors } from "@/lib/form-state";
import { requireRole } from "@/lib/auth";
import { getDictionary } from "@/lib/i18n";
import { getReadingTime } from "@/lib/reading-time";
import { plainText, sanitizeArticleContent } from "@/lib/sanitize";
import { createSlug } from "@/lib/slug";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  articleAdminUpdateSchema,
  articleIdSchema,
  categorySchema,
  rejectArticleSchema,
  updateRoleSchema
} from "@/lib/validation";

export async function approveArticleAction(formData: FormData) {
  const parsed = articleIdSchema.safeParse({ articleId: formString(formData, "articleId") });
  if (!parsed.success) return;

  await requireRole(["editor", "admin"], "/admin");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("articles")
    .update({
      status: "approved",
      rejection_reason: null,
      published_at: new Date().toISOString()
    })
    .eq("id", parsed.data.articleId)
    .eq("status", "pending_review");

  if (error) {
    console.error("Approve article error:", error.message);
    throw new Error(error.message);
  };

  revalidatePath("/admin");
  revalidatePath("/articles");
  revalidatePath("/");
}

export async function rejectArticleAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const parsed = rejectArticleSchema.safeParse({
    articleId: formString(formData, "articleId"),
    reason: formString(formData, "reason")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.rejectionReason, errors: zodErrors(parsed.error.flatten()) };
  }

  await requireRole(["editor", "admin"], "/admin");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("articles")
    .update({
      status: "rejected",
      rejection_reason: plainText(parsed.data.reason),
      published_at: null
    })
    .eq("id", parsed.data.articleId)
    .eq("status", "pending_review");

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  return { status: "success", message: dictionary.messages.articleRejected };
}

export async function deleteArticleAdminAction(formData: FormData) {
  const parsed = articleIdSchema.safeParse({ articleId: formString(formData, "articleId") });
  if (!parsed.success) return;

  await requireRole(["admin"], "/admin");
  const supabase = await createServerSupabaseClient();
  await supabase.from("articles").delete().eq("id", parsed.data.articleId);
  revalidatePath("/admin");
  revalidatePath("/articles");
  revalidatePath("/");
}

export async function updateUserRoleAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const parsed = updateRoleSchema.safeParse({
    userId: formString(formData, "userId"),
    role: formString(formData, "role")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.validRole, errors: zodErrors(parsed.error.flatten()) };
  }

  await requireRole(["admin"], "/admin");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("profiles").update({ role: parsed.data.role }).eq("id", parsed.data.userId);

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin");
  return { status: "success", message: dictionary.messages.roleUpdated };
}

export async function createCategoryAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const parsed = categorySchema.safeParse({
    name: formString(formData, "name"),
    description: formString(formData, "description")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.categoryFields, errors: zodErrors(parsed.error.flatten()) };
  }

  await requireRole(["admin"], "/admin");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("categories").upsert(
    {
      name: plainText(parsed.data.name),
      slug: createSlug(parsed.data.name),
      description: parsed.data.description ? plainText(parsed.data.description) : null
    },
    { onConflict: "slug" }
  );

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin");
  revalidatePath("/categories");
  return { status: "success", message: dictionary.messages.categorySaved };
}

function appendAdminSources(content: string, sources?: string, heading = "Sources / References") {
  if (!sources) return content;

  const sourceItems = sources
    .split("\n")
    .map((source) => plainText(source))
    .filter(Boolean)
    .map((source) => `<li>${source}</li>`)
    .join("");

  return `${content}<h2 id="sources">${heading}</h2><ol>${sourceItems}</ol>`;
}

async function upsertAdminTags(articleId: string, tags: string[]) {
  if (!tags.length) return;

  const supabase = await createServerSupabaseClient();
  await supabase.from("article_tags").delete().eq("article_id", articleId);

  for (const tag of tags) {
    const { data, error } = await supabase
      .from("tags")
      .upsert({ name: plainText(tag), slug: createSlug(tag, "tag") }, { onConflict: "slug" })
      .select("id")
      .single();

    if (!error && data) {
      await supabase.from("article_tags").upsert({ article_id: articleId, tag_id: data.id });
    }
  }
}

export async function updateArticleAdminAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const parsed = articleAdminUpdateSchema.safeParse({
    id: formString(formData, "id"),
    title: formString(formData, "title"),
    subtitle: optionalFormString(formData, "subtitle") ?? "",
    categoryId: formString(formData, "categoryId"),
    language: formString(formData, "language"),
    tags: optionalFormString(formData, "tags") ?? "",
    abstract: formString(formData, "abstract"),
    content: formString(formData, "content"),
    sources: optionalFormString(formData, "sources") ?? "",
    coverImageUrl: optionalFormString(formData, "coverImageUrl") ?? ""
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.checkFields, errors: zodErrors(parsed.error.flatten()) };
  }

  await requireRole(["editor", "admin"], "/admin");
  const supabase = await createServerSupabaseClient();
  const sanitizedContent = sanitizeArticleContent(appendAdminSources(parsed.data.content ?? "", parsed.data.sources ?? "", dictionary.messages.sourcesHeading ?? ""));

  const { error } = await supabase
    .from("articles")
    .update({
      title: plainText(parsed.data.title),
      subtitle: parsed.data.subtitle ? plainText(parsed.data.subtitle) : null,
      abstract: plainText(parsed.data.abstract),
      content: sanitizedContent,
      cover_image_url: parsed.data.coverImageUrl || null,
      language: parsed.data.language,
      category_id: parsed.data.categoryId,
      reading_time: getReadingTime(sanitizedContent)
    })
    .eq("id", parsed.data.id);

  if (error) return { status: "error", message: error.message };

  await upsertAdminTags(parsed.data.id, splitCommaList(parsed.data.tags));
  revalidatePath("/admin");
  revalidatePath("/articles");
  return { status: "success", message: dictionary.messages.articleUpdated };
}
