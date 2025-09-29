import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GridBackdropProps {
  className?: string;
}

export function GridBackdrop({ className }: GridBackdropProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <motion.div
        className="absolute inset-0 bg-grid-pattern opacity-20"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "120px 120px" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent-red/10 via-transparent to-neon-purple/10"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
