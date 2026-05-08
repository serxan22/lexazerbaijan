import type { ArticleLanguage, ArticleStatus, UserRole } from "@/types/database";

export type CategorySummary = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  count?: number;
};

export type AuthorSummary = {
  id: string;
  fullName: string;
  username: string;
  avatarUrl: string | null;
  bio: string | null;
  university: string | null;
  workplace: string | null;
  interests: string[];
  socialLinks: {
    linkedin?: string;
    website?: string;
    x?: string;
  };
  role: UserRole;
  totalViews: number;
  totalLikes: number;
  publishedCount: number;
};

export type ArticleCardItem = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  abstract: string;
  coverImageUrl: string | null;
  language: ArticleLanguage;
  category: CategorySummary | null;
  author: AuthorSummary;
  status: ArticleStatus;
  viewsCount: number;
  likesCount: number;
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
};

export type ArticleDetail = ArticleCardItem & {
  content: string;
  related: ArticleCardItem[];
};

export type DashboardArticle = ArticleCardItem & {
  rejectionReason: string | null;
  commentsCount: number;
};

export type AdminArticle = DashboardArticle;

export type ArticleComment = {
  id: string;
  content: string;
  createdAt: string;
  userId?: string;
  author: {
    fullName: string;
    username: string;
    avatarUrl: string | null;
  };
};
