"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to Light" : "Switch to Dark";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="premium-theme-toggle"
      data-mode={isDark ? "dark" : "light"}
    >
      <span className="premium-theme-toggle__track" aria-hidden="true">
        <span className="premium-theme-toggle__knob">
          {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </span>
      </span>
      <span className="premium-theme-toggle__label">{label}</span>
    </button>
  );
}
