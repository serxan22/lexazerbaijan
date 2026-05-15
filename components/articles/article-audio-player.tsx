"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";

type ArticleAudioPlayerProps = {
  title: string;
  content: string;
};

function cleanText(input: string) {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function ArticleAudioPlayer({ title, content }: ArticleAudioPlayerProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const textToRead = useMemo(() => {
    const cleanedTitle = cleanText(title);
    const cleanedContent = cleanText(content);
    return `${cleanedTitle}. ${cleanedContent}`;
  }, [title, content]);

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window);

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function play() {
    if (!isSupported || !textToRead) return;

    if (window.speechSynthesis.paused && utteranceRef.current) {
      window.speechSynthesis.resume();
      setStatus("playing");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setStatus("idle");
      utteranceRef.current = null;
    };

    utterance.onerror = () => {
      setStatus("idle");
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setStatus("playing");
  }

  function pause() {
    if (!isSupported) return;

    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setStatus("paused");
    }
  }

  function stop() {
    if (!isSupported) return;

    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setStatus("idle");
  }

  if (!isSupported || !textToRead) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
            <Volume2 className="h-5 w-5 text-slate-800 dark:text-slate-100" aria-hidden="true" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              Listen to this article
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Audio reading powered by your browser’s built-in voice.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={play}
            className="inline-flex items-center gap-2 rounded-full border bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:border-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            {status === "paused" ? "Resume" : status === "playing" ? "Restart" : "Play"}
          </button>

          <button
            type="button"
            onClick={pause}
            disabled={status !== "playing"}
            className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <Pause className="h-4 w-4" aria-hidden="true" />
            Pause
          </button>

          <button
            type="button"
            onClick={stop}
            disabled={status === "idle"}
            className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <Square className="h-4 w-4" aria-hidden="true" />
            Stop
          </button>
        </div>
      </div>

      {status !== "idle" ? (
        <p className="mt-4 border-t pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          {status === "playing" ? "Reading article..." : "Audio paused."}
        </p>
      ) : null}
    </div>
  );
}
