"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatPillProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

export function StatPill({ value, suffix = "", label, className }: StatPillProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 900;
    const start = performance.now();

    const loop = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setDisplayValue(Math.round(progress * value));
      if (progress < 1) {
        frame = requestAnimationFrame(loop);
      }
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "glass-panel flex flex-col gap-1 rounded-2xl border border-white/10 px-6 py-5 text-left shadow-glow",
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <span className="text-2xl font-semibold text-neon-cyan">
        {displayValue}
        {suffix}
      </span>
      <span className="text-xs uppercase tracking-[0.35em] text-muted">{label}</span>
    </motion.div>
  );
}
