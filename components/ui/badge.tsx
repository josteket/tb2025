import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest",
        variant === "default"
          ? "border-neon-cyan text-neon-cyan/90 bg-neon-cyan/10"
          : "border-muted/40 text-muted/80",
        className
      )}
      {...props}
    />
  );
}
