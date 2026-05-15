"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function scoreContent(raw: string) {
  const text = stripHtml(raw);
  const words = text ? text.split(/\s+/).length : 0;
  const sentences = text ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = raw.split(/\n{2,}|<\/p>|<br\s*\/?>/gi).filter((part) => stripHtml(part).length > 40).length;
  const headings = (raw.match(/<h[1-4]|^#{1,4}\s/gim) ?? []).length;
  const citations = (raw.match(/\b(article|case|court|law|treaty|convention|constitution|directive|regulation|v\.|§|\[\d+\]|\(\d{4}\))/gi) ?? []).length;
  const reasoningWords = (text.match(/\b(because|therefore|however|although|whereas|court|legal|issue|rule|analysis|conclusion|liability|right|duty|obligation)\b/gi) ?? []).length;

  const averageSentenceLength = sentences > 0 ? words / sentences : words;

  const clarity = clamp(100 - Math.abs(averageSentenceLength - 20) * 2 + Math.min(15, sentences));
  const structure = clamp(35 + paragraphs * 10 + headings * 15);
  const legalReasoning = clamp(30 + reasoningWords * 4);
  const citationQuality = clamp(25 + citations * 9);

  return {
    words,
    clarity,
    structure,
    legalReasoning,
    citationQuality,
    overall: clamp((clarity + structure + legalReasoning + citationQuality) / 4),
  };
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600 dark:text-slate-300">{label}</span>
        <span className="font-semibold text-slate-950 dark:text-slate-50">{value}/100</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-2 rounded-full bg-amber-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function LegalWritingScore() {
  const [content, setContent] = useState("");

  useEffect(() => {
    const selectors = [
      'textarea[name="content"]',
      'textarea[name="body"]',
      'textarea[id*="content"]',
      'textarea[id*="body"]',
      '[contenteditable="true"]',
    ];

    const findEditor = () => {
      for (const selector of selectors) {
        const element = document.querySelector(selector) as HTMLTextAreaElement | HTMLElement | null;
        if (element) return element;
      }
      return null;
    };

    const editor = findEditor();

    if (!editor) {
      return;
    }

    const readValue = () => {
      if (editor instanceof HTMLTextAreaElement) {
        setContent(editor.value);
      } else {
        setContent(editor.textContent ?? "");
      }
    };

    readValue();

    editor.addEventListener("input", readValue);
    editor.addEventListener("keyup", readValue);

    return () => {
      editor.removeEventListener("input", readValue);
      editor.removeEventListener("keyup", readValue);
    };
  }, []);

  const score = useMemo(() => scoreContent(content), [content]);

  return (
    <section className="rounded-3xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
          <BarChart3 className="h-5 w-5 text-slate-900 dark:text-slate-100" aria-hidden="true" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
            Legal Writing Score
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Draft quality estimate based on clarity, structure, legal reasoning, and citation signals.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-900">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          Overall
        </p>
        <p className="mt-1 text-4xl font-bold text-slate-950 dark:text-slate-50">
          {score.overall}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {score.words} words analyzed
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <ScoreRow label="Clarity" value={score.clarity} />
        <ScoreRow label="Structure" value={score.structure} />
        <ScoreRow label="Legal reasoning" value={score.legalReasoning} />
        <ScoreRow label="Citation quality" value={score.citationQuality} />
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500 dark:text-slate-400">
        This is not an academic grade. It is a writing assistant indicator to help authors improve before submission.
      </p>
    </section>
  );
}
