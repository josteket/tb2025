"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(ratio);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circumference = 2 * Math.PI * 18;
  const dashOffset = circumference - circumference * progress;

  return (
    <button
      onClick={() => {
        document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-background/80 backdrop-blur-lg text-neon-cyan shadow-glow focus-outline"
      aria-label="Наверх"
    >
      <svg className="absolute h-14 w-14 -rotate-90" viewBox="0 0 40 40" aria-hidden>
        <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="url(#progress-gradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="var(--neon-cyan)" />
            <stop offset="100%" stopColor="var(--neon-purple)" />
          </linearGradient>
        </defs>
      </svg>
      <ArrowUp className="relative h-5 w-5" />
    </button>
  );
}
