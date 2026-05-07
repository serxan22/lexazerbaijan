import { z } from "zod";

export const authEmailSchema = z.string().email("Enter a valid email address.").max(320);

export const loginSchema = z.object({
  email: authEmailSchema,
  password: z.string().min(8, "Password must be at least 8 characters.")
});

export const signUpSchema = loginSchema.extend({
  fullName: z.string().min(2, "Full name is required.").max(120),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(32)
    .regex(/^[a-z0-9_]+$/, "Use lowercase letters, numbers, and underscores only.")
});

export const forgotPasswordSchema = z.object({
  email: authEmailSchema
});

export const profileSchema = z.object({
  fullName: z.string().min(2).max(120),
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-z0-9_]+$/),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  bio: z.string().max(1200).optional().or(z.literal("")),
  university: z.string().max(140).optional().or(z.literal("")),
  workplace: z.string().max(140).optional().or(z.literal("")),
  interests: z.string().max(500).optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal(""))
});

export const articleIntentSchema = z.enum(["draft", "pending_review"]);
export const articleLanguageSchema = z.enum(["en", "az", "ru"]);

export const articleSchema = z.object({
  title: z.string().max(1000).optional().or(z.literal("")),
  subtitle: z.string().max(2000).optional().or(z.literal("")),
  categoryId: z.string().optional().or(z.literal("")),
  language: articleLanguageSchema.default("az"),
  tags: z.string().max(5000).optional().or(z.literal("")),
  abstract: z.string().max(10000).optional().or(z.literal("")),
  content: z.string().max(500000).optional().or(z.literal("")),
  sources: z.string().max(50000).optional().or(z.literal("")),
  coverImageUrl: z.string().max(5000).optional().or(z.literal("")),
  intent: articleIntentSchema
});

export const articleUpdateSchema = articleSchema.extend({
  id: z.string().uuid()
});

export const articleAdminUpdateSchema = articleSchema
  .omit({ intent: true })
  .extend({
    id: z.string().uuid()
  });

export const commentSchema = z.object({
  articleId: z.string().uuid(),
  content: z.string().min(2).max(1200)
});

export const reportSchema = z.object({
  articleId: z.string().uuid(),
  reason: z.string().min(10).max(1200)
});

export const newsletterSchema = z.object({
  email: authEmailSchema
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: authEmailSchema,
  subject: z.string().min(4).max(160),
  message: z.string().min(20).max(4000)
});

export const rejectArticleSchema = z.object({
  articleId: z.string().uuid(),
  reason: z.string().min(10).max(900)
});

export const articleIdSchema = z.object({
  articleId: z.string().uuid()
});

export const updateRoleSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["user", "author", "editor", "admin"])
});

export const categorySchema = z.object({
  name: z.string().min(2).max(90),
  description: z.string().max(300).optional().or(z.literal(""))
});
