import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8894a] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#0B1220] text-white shadow-sm hover:bg-[#172033] dark:bg-[#f3d28d] dark:text-[#0B1220] dark:hover:bg-[#ffe2a4]",
        accent: "bg-gold text-white shadow-sm hover:bg-[#A7783F]",
        gold: "bg-gold text-white shadow-sm hover:bg-[#A7783F]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-[#d9c79f]/80 bg-white/80 text-[#243044] shadow-sm hover:border-[#b8894a] hover:bg-[#fff8e8] dark:border-[#b8894a]/30 dark:bg-[#0b1728] dark:text-slate-100 dark:hover:bg-[#111f34] dark:hover:text-white",
        secondary: "bg-[#f5efe5] text-[#172033] shadow-sm hover:bg-[#efe3cf] dark:bg-[#172033] dark:text-slate-100 dark:hover:bg-[#22304a]",
        ghost: "text-[#243044] hover:bg-[#f5efe5] hover:text-[#8a612f] dark:text-slate-100 dark:hover:bg-[#172033] dark:hover:text-[#f1d79d]",
        link: "text-[#8a612f] underline-offset-4 hover:underline dark:text-[#f1d79d]"
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
