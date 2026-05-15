"use client";

import { useMemo } from "react";

type LegalDictionaryArticleProps = {
  content: string;
};

const TERMS = [
  {
    term: "mens rea",
    definition: "Criminal intention or guilty mind.",
  },
  {
    term: "actus reus",
    definition: "The physical act or conduct of a crime.",
  },
  {
    term: "jurisdiction",
    definition: "A court’s legal authority to hear and decide a case.",
  },
  {
    term: "corporate veil",
    definition: "The legal separation between a company and its shareholders.",
  },
  {
    term: "legal personality",
    definition: "The ability to have legal rights and duties.",
  },
  {
    term: "fiduciary duty",
    definition: "A duty to act loyally and carefully for another person’s interests.",
  },
  {
    term: "due process",
    definition: "Fair legal procedure before rights or interests are affected.",
  },
  {
    term: "burden of proof",
    definition: "The duty to prove a legal claim or allegation.",
  },
  {
    term: "precedent",
    definition: "A previous court decision used as authority in later cases.",
  },
  {
    term: "ratio decidendi",
    definition: "The legal reason for a court’s decision.",
  },
  {
    term: "tort",
    definition: "A civil wrong that may create legal liability.",
  },
  {
    term: "negligence",
    definition: "Failure to take reasonable care, causing harm or risk.",
  },
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function enhanceContent(html: string) {
  if (typeof window === "undefined") {
    return html;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstElementChild;

  if (!root) {
    return html;
  }

  const blockedTags = new Set(["A", "CODE", "PRE", "SCRIPT", "STYLE", "TEXTAREA", "INPUT", "BUTTON"]);
  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  const textNodes: Text[] = [];
  let node = walker.nextNode();

  while (node) {
    const parent = node.parentElement;
    if (parent && !blockedTags.has(parent.tagName)) {
      textNodes.push(node as Text);
    }
    node = walker.nextNode();
  }

  const termsPattern = TERMS.map((item) => escapeRegExp(item.term)).join("|");
  const regex = new RegExp(`\\b(${termsPattern})\\b`, "gi");

  for (const textNode of textNodes) {
    const original = textNode.nodeValue ?? "";

    if (!regex.test(original)) {
      regex.lastIndex = 0;
      continue;
    }

    regex.lastIndex = 0;
    const fragment = doc.createDocumentFragment();
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(original)) !== null) {
      const matchedText = match[0];
      const start = match.index;

      if (start > lastIndex) {
        fragment.appendChild(doc.createTextNode(original.slice(lastIndex, start)));
      }

      const found = TERMS.find((item) => item.term.toLowerCase() === matchedText.toLowerCase());

      if (found) {
        const span = doc.createElement("span");
        span.textContent = matchedText;
        span.setAttribute("tabindex", "0");
        span.setAttribute("data-definition", found.definition);
        span.setAttribute(
          "class",
          "group relative cursor-help border-b border-dotted border-amber-600 font-medium text-slate-950 outline-none transition hover:text-amber-700 focus:text-amber-700 dark:border-amber-400 dark:text-slate-50 dark:hover:text-amber-300 dark:focus:text-amber-300"
        );

        const tooltip = doc.createElement("span");
        tooltip.textContent = found.definition;
        tooltip.setAttribute(
          "class",
          "pointer-events-none absolute left-1/2 top-full z-30 mt-2 hidden w-64 -translate-x-1/2 rounded-xl border bg-white p-3 text-xs font-normal leading-5 text-slate-700 shadow-xl group-hover:block group-focus:block dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        );

        span.appendChild(tooltip);
        fragment.appendChild(span);
      } else {
        fragment.appendChild(doc.createTextNode(matchedText));
      }

      lastIndex = start + matchedText.length;
    }

    if (lastIndex < original.length) {
      fragment.appendChild(doc.createTextNode(original.slice(lastIndex)));
    }

    textNode.parentNode?.replaceChild(fragment, textNode);
  }

  return root.innerHTML;
}

export function LegalDictionaryArticle({ content }: LegalDictionaryArticleProps) {
  const enhanced = useMemo(() => enhanceContent(content), [content]);

  return (
    <div
      className="article-prose prose prose-slate mt-8 max-w-none text-slate-800 dark:prose-invert dark:text-slate-100"
      dangerouslySetInnerHTML={{ __html: enhanced }}
    />
  );
}
