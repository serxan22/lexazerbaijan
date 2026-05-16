"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle({
  label = "Toggle theme",
  lightLabel = "Light",
  darkLabel = "Dark",
  className
}: {
  label?: string;
  lightLabel?: string;
  darkLabel?: string;
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 text-xs font-semibold text-foreground shadow-sm backdrop-blur transition hover:border-gold/40 hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      aria-label={label}
      title={label}
    >
      {mounted && isDark ? <Sun className="h-4 w-4 text-gold" /> : <Moon className="h-4 w-4 text-gold" />}
      <span className="hidden xl:inline">{mounted && isDark ? lightLabel : darkLabel}</span>
    </button>
  );
}
