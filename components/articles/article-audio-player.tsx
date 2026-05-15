"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";

type ArticleAudioPlayerProps = {
  title: string;
  content: string;
};

function cleanText(input: string) {
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_`~\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function ArticleAudioPlayer({ title, content }: ArticleAudioPlayerProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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

  const handlePlay = () => {
    if (!isSupported || !textToRead) return;

    if (window.speechSynthesis.paused && utteranceRef.current) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (!isSupported) return;

    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    utteranceRef.current = null;
  };

  if (!isSupported) {
    return null;
  }

  return (
    <section className="my-6 overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-border/70 bg-background/80 p-3 shadow-sm">
            <Volume2 className="h-5 w-5" aria-hidden="true" />
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">
              Listen to this article
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Audio reading powered by your browser’s built-in voice.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePlay}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted"
            aria-label={isPaused ? "Resume article audio" : "Play article audio"}
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            {isPaused ? "Resume" : isPlaying ? "Restart" : "Play"}
          </button>

          <button
            type="button"
            onClick={handlePause}
            disabled={!isPlaying}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Pause article audio"
          >
            <Pause className="h-4 w-4" aria-hidden="true" />
            Pause
          </button>

          <button
            type="button"
            onClick={handleStop}
            disabled={!isPlaying && !isPaused}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Stop article audio"
          >
            <Square className="h-4 w-4" aria-hidden="true" />
            Stop
          </button>
        </div>
      </div>

      {(isPlaying || isPaused) && (
        <div className="border-t border-border/70 bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
          {isPlaying ? "Reading article..." : "Audio paused."}
        </div>
      )}
    </section>
  );
}
