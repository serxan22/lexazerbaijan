const transliterationMap: Record<string, string> = {
  ə: "e",
  Ə: "e",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  I: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ü: "u",
  Ü: "u",
  ş: "s",
  Ş: "s",
  ç: "c",
  Ç: "c"
};

export function slugify(input: string) {
  return input
    .split("")
    .map((character) => transliterationMap[character] ?? character)
    .join("")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function createSlug(input: string, fallback = "article") {
  const slug = slugify(input);
  return slug || fallback;
}
