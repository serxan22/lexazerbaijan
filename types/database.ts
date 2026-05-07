export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "user" | "author" | "editor" | "admin";
export type ArticleStatus = "draft" | "pending_review" | "approved" | "rejected";
export type ArticleLanguage = "en" | "az" | "ru";
export type CommentStatus = "visible" | "hidden" | "removed";
export type ReportStatus = "open" | "reviewed" | "dismissed";

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          username: string | null;
          avatar_url: string | null;
          bio: string | null;
          university: string | null;
          workplace: string | null;
          role: UserRole;
          interests: string[] | null;
          social_links: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          university?: string | null;
          workplace?: string | null;
          role?: UserRole;
          interests?: string[] | null;
          social_links?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          subtitle: string | null;
          abstract: string;
          content: string;
          cover_image_url: string | null;
          language: ArticleLanguage;
          author_id: string;
          category_id: string | null;
          status: ArticleStatus;
          rejection_reason: string | null;
          views_count: number;
          likes_count: number;
          reading_time: number;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          subtitle?: string | null;
          abstract: string;
          content: string;
          cover_image_url?: string | null;
          language?: ArticleLanguage;
          author_id: string;
          category_id?: string | null;
          status?: ArticleStatus;
          rejection_reason?: string | null;
          views_count?: number;
          likes_count?: number;
          reading_time?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["articles"]["Insert"]>;
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
        Relationships: [];
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tags"]["Insert"]>;
        Relationships: [];
      };
      article_tags: {
        Row: {
          article_id: string;
          tag_id: string;
        };
        Insert: {
          article_id: string;
          tag_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["article_tags"]["Insert"]>;
        Relationships: [];
      };
      comments: {
        Row: {
          id: string;
          article_id: string;
          user_id: string;
          content: string;
          status: CommentStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          user_id: string;
          content: string;
          status?: CommentStatus;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["comments"]["Insert"]>;
        Relationships: [];
      };
      likes: {
        Row: {
          id: string;
          article_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["likes"]["Insert"]>;
        Relationships: [];
      };
      bookmarks: {
        Row: {
          id: string;
          article_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookmarks"]["Insert"]>;
        Relationships: [];
      };
      reports: {
        Row: {
          id: string;
          article_id: string;
          user_id: string;
          reason: string;
          status: ReportStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          user_id: string;
          reason: string;
          status?: ReportStatus;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["reports"]["Insert"]>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Insert"]>;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_article_views: {
        Args: { article_slug: string };
        Returns: void;
      };
    };
    Enums: {
      user_role: UserRole;
      article_status: ArticleStatus;
      comment_status: CommentStatus;
      report_status: ReportStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
