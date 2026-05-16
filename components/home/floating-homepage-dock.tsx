"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Bot, Gavel, Home, MessageSquare, Newspaper } from "lucide-react";

const nav = [
  { label: "Home", href: "#intro", icon: Home },
  { label: "Articles", href: "#articles", icon: Newspaper },
  { label: "Cases", href: "#cases", icon: Gavel },
  { label: "Community", href: "#community", icon: MessageSquare },
  { label: "LexAI", href: "/lexai", icon: Bot },
];

export function FloatingHomepageDock() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <aside className="fixed left-10 top-1/2 z-[2147483647] hidden -translate-y-1/2 lg:block">
      <nav className="group/nav flex w-[74px] flex-col items-start gap-4 overflow-hidden rounded-full border border-black/10 bg-white/85 px-4 py-7 shadow-2xl shadow-black/10 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:w-[190px] hover:rounded-[2rem] hover:bg-white/95 dark:border-white/10 dark:bg-white/[0.08] dark:shadow-black/40 dark:hover:bg-white/[0.12]">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className="flex h-11 w-[150px] items-center gap-4 rounded-full px-2 text-black/45 transition-all duration-300 hover:bg-black/10 hover:text-black dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                <Icon className="h-6 w-6" />
              </span>
              <span className="translate-x-2 whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover/nav:translate-x-0 group-hover/nav:opacity-100">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>,
    document.body
  );
}
