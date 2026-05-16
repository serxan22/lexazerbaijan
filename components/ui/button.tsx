import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 dark:bg-white dark:text-slate-950 dark:hover:bg-white/90",
        accent: "bg-navy text-white shadow-sm hover:bg-navy/90 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white",
        gold: "bg-gold text-slate-950 shadow-sm shadow-gold/20 hover:bg-[#D0A05E]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background/60 text-foreground shadow-sm backdrop-blur hover:border-gold/40 hover:bg-gold/10 hover:text-foreground dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:hover:bg-white/10 dark:hover:text-white",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
        ghost: "text-foreground hover:bg-gold/10 hover:text-foreground dark:text-slate-100 dark:hover:bg-white/10 dark:hover:text-white",
        link: "text-accent underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
