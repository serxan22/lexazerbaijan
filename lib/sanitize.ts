import sanitizeHtml from "sanitize-html";

export function sanitizeArticleContent(content: string) {
  return sanitizeHtml(content, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "blockquote",
      "ul",
      "ol",
      "li",
      "h2",
      "h3",
      "h4",
      "a",
      "code",
      "pre",
      "hr",
      "sup",
      "sub"
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      h2: ["id"],
      h3: ["id"],
      h4: ["id"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "nofollow noopener noreferrer",
        target: "_blank"
      })
    }
  });
}

export function plainText(value: string) {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim();
}
