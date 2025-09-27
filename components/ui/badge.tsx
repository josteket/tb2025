import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.35em] text-neon-cyan",
      className
    )}
    {...props}
  />
));
Badge.displayName = "Badge";

export { Badge };
