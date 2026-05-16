import Link from "next/link";
import { Scale } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tagline = "Legal journal",
  inverted = false
}: {
  className?: string;
  tagline?: string;
  inverted?: boolean;
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label={`${siteConfig.name} home`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/25 bg-navy text-white shadow-sm shadow-black/10 dark:bg-white/10">
        <Scale className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-xl font-semibold", inverted ? "text-white" : "text-slate-950 dark:text-white")}>{siteConfig.name}</span>
        <span className={cn("mt-1 text-[11px] font-semibold uppercase tracking-[0.18em]", inverted ? "text-white/46" : "text-slate-500 dark:text-slate-400")}>{tagline}</span>
      </span>
    </Link>
  );
}
