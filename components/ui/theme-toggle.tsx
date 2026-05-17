"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full border border-[#d9c79f]/70 bg-white px-4 py-2 text-sm font-medium text-[#172033] transition hover:scale-105 hover:border-[#b8894a] dark:border-[#b8894a]/30 dark:bg-[#0b1728] dark:text-[#f1d79d]"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
