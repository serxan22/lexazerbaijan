export function formString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function optionalFormString(formData: FormData, key: string) {
  const value = formString(formData, key);
  return value.length ? value : undefined;
}

export function splitCommaList(value?: string) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}
