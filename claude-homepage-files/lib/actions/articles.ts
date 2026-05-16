"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { formString, optionalFormString, splitCommaList } from "@/lib/form-data";
import type { ActionState } from "@/lib/form-state";
import { zodErrors } from "@/lib/form-state";
import { getDictionary } from "@/lib/i18n";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { getReadingTime } from "@/lib/reading-time";
import { sanitizeArticleContent, plainText } from "@/lib/sanitize";
import { createSlug } from "@/lib/slug";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  articleIdSchema,
  articleSchema,
  articleUpdateSchema,
  commentSchema,
  reportSchema
} from "@/lib/validation";

function appendSources(content: string, sources?: string, heading = "Sources / References") {
  if (!sources) return content;

  const sourceItems = sources
    .split("\n")
    .map((source) => plainText(source))
    .filter(Boolean)
    .map((source) => `<li>${source}</li>`)
    .join("");

  return `${content}<h2 id="sources">${heading}</h2><ol>${sourceItems}</ol>`;
}

async function uploadCoverImage(userId: string, formData: FormData) {
  const cover = formData.get("coverImage");
  if (!(cover instanceof File) || cover.size === 0) return null;

  if (cover.size > 5 * 1024 * 1024) {
    throw new Error("cover_too_large");
  }

  const extension = cover.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeExtension = ["jpg", "jpeg", "png", "webp"].includes(extension) ? extension : "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${safeExtension}`;
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.storage.from("article-covers").upload(path, cover, {
    contentType: cover.type || "image/jpeg",
    upsert: false
  });

  if (error) throw new Error(error.message);

  const {
    data: { publicUrl }
  } = supabase.storage.from("article-covers").getPublicUrl(path);

  return publicUrl;
}

async function upsertTags(articleId: string, tags: string[]) {
  if (!tags.length) return;

  const supabase = await createServerSupabaseClient();

  for (const tag of tags) {
    const slug = createSlug(tag, "tag");
    const { data: existing } = await supabase.from("tags").select("id").eq("slug", slug).maybeSingle();
    const { data, error } = existing
      ? { data: existing, error: null }
      : await supabase.from("tags").insert({ name: tag, slug }).select("id").single();

    if (!error && data) {
      await supabase.from("article_tags").upsert({ article_id: articleId, tag_id: data.id });
    }
  }
}

export async function submitArticleAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/submit");

  const headerList = await headers();
  const limit = rateLimit(clientKey(headerList, "submit_article", user.id), {
    intervalMs: 60 * 60 * 1000,
    max: 6
  });

  if (!limit.success) {
    return { status: "error", message: dictionary.messages.articleSubmissionLimit };
  }

  const parsed = articleSchema.safeParse({
    title: formString(formData, "title"),
    subtitle: optionalFormString(formData, "subtitle") ?? "",
    categoryId: formString(formData, "categoryId"),
    language: formString(formData, "language"),
    tags: optionalFormString(formData, "tags") ?? "",
    abstract: formString(formData, "abstract"),
    content: formString(formData, "content"),
    sources: optionalFormString(formData, "sources") ?? "",
    coverImageUrl: optionalFormString(formData, "coverImageUrl") ?? "",
    intent: formString(formData, "intent")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.checkFields, errors: zodErrors(parsed.error.flatten()) };
  }

  let coverImageUrl = parsed.data.coverImageUrl || null;

  try {
    coverImageUrl = (await uploadCoverImage(user.id, formData)) ?? coverImageUrl;
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error && error.message === "cover_too_large"
        ? dictionary.messages.coverTooLarge
        : dictionary.messages.coverUploadFailed
    };
  }

  const sanitizedContent = sanitizeArticleContent(appendSources(parsed.data.content ?? "", parsed.data.sources ?? "", dictionary.messages.sourcesHeading ?? ""));
  const article = {
    title: plainText(parsed.data.title ?? ""),
    slug: `${createSlug(parsed.data.title ?? "")}-${crypto.randomUUID().slice(0, 8)}`,
    subtitle: parsed.data.subtitle ? plainText(parsed.data.subtitle) : null,
    abstract: plainText(parsed.data.abstract ?? ""),
    content: sanitizedContent,
    cover_image_url: coverImageUrl,
    language: parsed.data.language,
    author_id: user.id,
    category_id: parsed.data.categoryId,
    status: parsed.data.intent,
    reading_time: getReadingTime(sanitizedContent),
    published_at: null
  };

  const { data, error } = await supabase.from("articles").insert(article).select("id").single();

  if (error || !data) {
    return { status: "error", message: error?.message ?? dictionary.messages.unableToSaveArticle };
  }

  await supabase.from("profiles").update({ role: "author" }).eq("id", user.id).eq("role", "user");
  await upsertTags(data.id, splitCommaList(parsed.data.tags));

  revalidatePath("/dashboard");
  revalidatePath("/admin");
  redirect("/dashboard");
}

export async function updateArticleAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const parsed = articleUpdateSchema.safeParse({
    id: formString(formData, "id"),
    title: formString(formData, "title"),
    subtitle: optionalFormString(formData, "subtitle") ?? "",
    categoryId: formString(formData, "categoryId"),
    language: formString(formData, "language"),
    tags: optionalFormString(formData, "tags") ?? "",
    abstract: formString(formData, "abstract"),
    content: formString(formData, "content"),
    sources: optionalFormString(formData, "sources") ?? "",
    coverImageUrl: optionalFormString(formData, "coverImageUrl") ?? "",
    intent: formString(formData, "intent")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.checkFields, errors: zodErrors(parsed.error.flatten()) };
  }

  let coverImageUrl = parsed.data.coverImageUrl || null;

  try {
    coverImageUrl = (await uploadCoverImage(user.id, formData)) ?? coverImageUrl;
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error && error.message === "cover_too_large"
        ? dictionary.messages.coverTooLarge
        : dictionary.messages.coverUploadFailed
    };
  }

  const sanitizedContent = sanitizeArticleContent(appendSources(parsed.data.content ?? "", parsed.data.sources ?? "", dictionary.messages.sourcesHeading ?? ""));
  const { error } = await supabase
    .from("articles")
    .update({
      title: plainText(parsed.data.title ?? ""),
      subtitle: parsed.data.subtitle ? plainText(parsed.data.subtitle) : null,
      abstract: plainText(parsed.data.abstract ?? ""),
      content: sanitizedContent,
      cover_image_url: coverImageUrl,
      language: parsed.data.language,
      category_id: parsed.data.categoryId,
      status: parsed.data.intent,
      rejection_reason: null,
      reading_time: getReadingTime(sanitizedContent)
    })
    .eq("id", parsed.data.id)
    .eq("author_id", user.id);

  if (error) {
    return { status: "error", message: error.message };
  }

  await supabase.from("article_tags").delete().eq("article_id", parsed.data.id);
  await upsertTags(parsed.data.id, splitCommaList(parsed.data.tags));

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteDraftAction(formData: FormData) {
  const parsed = articleIdSchema.safeParse({ articleId: formString(formData, "articleId") });
  if (!parsed.success) return;

  const supabase = await createServerSupabaseClient();
  await supabase.from("articles").delete().eq("id", parsed.data.articleId).in("status", ["draft", "rejected"]);
  revalidatePath("/dashboard");
}

export async function submitForReviewAction(formData: FormData) {
  const parsed = articleIdSchema.safeParse({ articleId: formString(formData, "articleId") });
  if (!parsed.success) return;

  const supabase = await createServerSupabaseClient();
  await supabase
    .from("articles")
    .update({ status: "pending_review", rejection_reason: null })
    .eq("id", parsed.data.articleId)
    .in("status", ["draft", "rejected"]);
  revalidatePath("/dashboard");
  revalidatePath("/admin");
}

export async function likeArticleAction(formData: FormData) {
  const articleId = formString(formData, "articleId");
  const slug = formString(formData, "slug");
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?next=/articles/${slug}`);

  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("article_id", articleId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase.from("likes").delete().eq("id", existing.id);
  } else {
    await supabase.from("likes").insert({ article_id: articleId, user_id: user.id });
  }

  revalidatePath(`/articles/${slug}`);
}

export async function bookmarkArticleAction(formData: FormData) {
  const articleId = formString(formData, "articleId");
  const slug = formString(formData, "slug");
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?next=/articles/${slug}`);

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("article_id", articleId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase.from("bookmarks").delete().eq("id", existing.id);
  } else {
    await supabase.from("bookmarks").insert({ article_id: articleId, user_id: user.id });
  }

  revalidatePath(`/articles/${slug}`);
}

export async function addCommentAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const parsed = commentSchema.safeParse({
    articleId: formString(formData, "articleId"),
    content: formString(formData, "content")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.commentTooShort, errors: zodErrors(parsed.error.flatten()) };
  }

  const slug = formString(formData, "slug");
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?next=/articles/${slug}`);

  const headerList = await headers();
  const limit = rateLimit(clientKey(headerList, "comment", user.id), {
    intervalMs: 10 * 60 * 1000,
    max: 8
  });

  if (!limit.success) {
    return { status: "error", message: dictionary.messages.commentRateLimit };
  }

  const { error } = await supabase.from("comments").insert({
    article_id: parsed.data.articleId,
    user_id: user.id,
    content: plainText(parsed.data.content)
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath(`/articles/${slug}`);
  return { status: "success", message: dictionary.messages.commentPosted };
}

export async function reportArticleAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const dictionary = await getDictionary();
  const parsed = reportSchema.safeParse({
    articleId: formString(formData, "articleId"),
    reason: formString(formData, "reason")
  });

  if (!parsed.success) {
    return { status: "error", message: dictionary.messages.reportClearReason, errors: zodErrors(parsed.error.flatten()) };
  }

  const slug = formString(formData, "slug");
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?next=/articles/${slug}`);

  const headerList = await headers();
  const limit = rateLimit(clientKey(headerList, "report", user.id), {
    intervalMs: 60 * 60 * 1000,
    max: 5
  });

  if (!limit.success) {
    return { status: "error", message: dictionary.messages.reportLimit };
  }

  const { error } = await supabase.from("reports").insert({
    article_id: parsed.data.articleId,
    user_id: user.id,
    reason: plainText(parsed.data.reason)
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath(`/articles/${slug}`);
  return { status: "success", message: dictionary.messages.reportReceived };
}

export async function deleteCommentAction(formData: FormData) {
  const commentId = formString(formData, "commentId");
  const slug = formString(formData, "slug");

  const supabase = await createServerSupabaseClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?next=/articles/${slug}`);

  const { data: comment } = await supabase
    .from("comments")
    .select("user_id")
    .eq("id", commentId)
    .maybeSingle();

  if (!comment || comment.user_id !== user.id) {
    return;
  }

  await supabase.from("comments").delete().eq("id", commentId);

  revalidatePath(`/articles/${slug}`);
}

export async function updateCommentAction(formData: FormData) {
  const commentId = formString(formData, "commentId");
  const slug = formString(formData, "slug");
  const content = plainText(formString(formData, "content"));

  const supabase = await createServerSupabaseClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?next=/articles/${slug}`);

  const { data: comment } = await supabase
    .from("comments")
    .select("user_id")
    .eq("id", commentId)
    .maybeSingle();

  if (!comment || comment.user_id !== user.id) {
    return;
  }

  await supabase
    .from("comments")
    .update({ content })
    .eq("id", commentId);

  revalidatePath(`/articles/${slug}`);
}
