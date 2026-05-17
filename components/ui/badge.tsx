import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-[#d9c79f]/70 text-[#243044] dark:border-[#b8894a]/30 dark:text-slate-200",
        gold: "border-gold/25 bg-gold-muted text-[#835E2F] dark:border-[#b8894a]/30 dark:bg-[#172033] dark:text-[#f1d79d]",
        blue: "border-[#d9c79f]/70 bg-[#f5efe5] text-[#172033] dark:border-[#b8894a]/25 dark:bg-[#172033] dark:text-[#f1d79d]",
        success: "border-emerald-100 bg-emerald-50 text-emerald-700",
        warning: "border-amber-100 bg-amber-50 text-amber-700",
        destructive: "border-red-100 bg-red-50 text-red-700"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
