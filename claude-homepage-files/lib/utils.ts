import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Locale } from "@/lib/i18n-config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateLocales: Record<Locale, string> = {
  en: "en",
  az: "az-AZ",
  ru: "ru-RU"
};

export function formatDate(
  date?: string | null,
  options?: Intl.DateTimeFormatOptions,
  locale: Locale = "en"
) {
  if (!date) return "Unpublished";

  return new Intl.DateTimeFormat(dateLocales[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options
  }).format(new Date(date));
}

export function formatNumber(value?: number | null, locale: Locale = "en") {
  return new Intl.NumberFormat(dateLocales[locale], { notation: "compact" }).format(value ?? 0);
}

export function initials(name?: string | null) {
  if (!name) return "LH";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
