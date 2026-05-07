export const locales = ["en", "az", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "lexazerbaijan-locale";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  az: "Azərbaycanca",
  ru: "Русский"
};

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && (locales as readonly string[]).includes(value));
}
