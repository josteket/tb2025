import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 font-semibold uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-red text-text shadow-glow-strong hover:bg-accent-red/90 focus-visible:ring-accent-red",
        secondary:
          "bg-transparent border-accent-red text-text hover:bg-accent-red/10 focus-visible:ring-accent-red",
        ghost:
          "bg-transparent text-text/80 hover:text-text hover:bg-white/5 focus-visible:ring-neon-cyan"
      },
      size: {
        default: "text-sm",
        sm: "text-xs px-4 py-2",
        lg: "text-base px-8 py-4"
      }
    },
    defaultVariants: {
      variant: "primary",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
