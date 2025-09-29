"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? scrolled / height : 0);
      setVisible(scrolled > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * progress;

  return (
    <motion.button
      type="button"
      aria-label="Наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-surface/80 backdrop-blur-xl shadow-glow transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan",
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      initial={{ scale: 0 }}
      animate={{ scale: visible ? 1 : 0.6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 80 80">
        <circle
          className="stroke-white/10"
          cx="40"
          cy="40"
          r={radius}
          strokeWidth="3"
          fill="transparent"
        />
        <motion.circle
          className="stroke-neon-cyan"
          cx="40"
          cy="40"
          r={radius}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: circumference - dash }}
        />
      </svg>
      <ArrowUp className="relative h-6 w-6 text-neon-cyan" />
    </motion.button>
  );
}
