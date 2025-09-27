"use client";

import { useRef } from "react";
import { useCounter } from "@/lib/animations";

export default function StatPill({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCounter(value, ref);

  return (
    <div className="glass-panel flex flex-col gap-2 rounded-2xl border border-white/10 p-6 text-center">
      <span ref={ref} className="text-3xl font-semibold text-neon-cyan" aria-live="polite" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
