import Link from "next/link";
import { Scale } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ className, tagline = "Legal journal" }: { className?: string; tagline?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label={`${siteConfig.name} home`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-navy text-white shadow-sm">
        <Scale className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-semibold text-slate-950">{siteConfig.name}</span>
        <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">{tagline}</span>
      </span>
    </Link>
  );
}
