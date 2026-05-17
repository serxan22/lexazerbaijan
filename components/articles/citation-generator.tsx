"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";

function year(date?: string | null) {
  return date ? new Date(date).getFullYear() : new Date().getFullYear();
}

function today() {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export function CitationGenerator({
  title,
  author,
  publishedAt,
  url
}: {
  title: string;
  author: string;
  publishedAt?: string | null;
  url: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const citations = useMemo(() => {
    const y = year(publishedAt);
    const accessed = today();

    return {
      APA: `${author}. (${y}). ${title}. LexAzerbaijan. ${url}`,
      OSCOLA: `${author}, '${title}' (LexAzerbaijan, ${y}) <${url}> accessed ${accessed}`,
      Bluebook: `${author}, ${title}, LexAzerbaijan (${y}), ${url}.`
    };
  }, [title, author, publishedAt, url]);

  async function copyCitation(label: string, citation: string) {
    await navigator.clipboard.writeText(citation);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="premium-surface p-5">
      <div className="flex items-center gap-2">
        <Quote className="h-5 w-5 text-[#b8894a]" />
        <h2 className="font-serif text-xl font-semibold text-slate-950">
          Cite this article
        </h2>
      </div>

      <div className="mt-4 grid gap-3">
        {Object.entries(citations).map(([label, citation]) => (
          <div key={label} className="premium-panel p-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">{label}</p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => copyCitation(label, citation)}
              >
                {copied === label ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied === label ? "Copied" : "Copy"}
              </Button>
            </div>

            <p className="text-sm leading-6 text-slate-600">{citation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
