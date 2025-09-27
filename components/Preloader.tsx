"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setIsLoaded(true);
    }, 1800);
    return () => window.clearTimeout(handle);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <motion.div
            className="relative flex h-28 w-28 items-center justify-center rounded-full border border-neon-cyan/30 bg-white/5 shadow-glow"
            initial={{ filter: "blur(8px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }}
          >
            <motion.svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              className="text-neon-cyan"
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1, 0.95, 1], rotate: [0, 5, -5, 0], transition: { duration: 2.4, repeat: Infinity } }}
              aria-hidden
            >
              <defs>
                <linearGradient id="preloader-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--neon-cyan)" />
                  <stop offset="100%" stopColor="var(--neon-purple)" />
                </linearGradient>
              </defs>
              <path
                d="M48 8c14 0 26 12 26 26 0 14-12 26-26 26S22 48 22 34 34 8 48 8Zm0 8c-10 0-18 8-18 18s8 18 18 18 18-8 18-18S58 16 48 16Z"
                fill="url(#preloader-gradient)"
                fillOpacity="0.85"
              />
              <path
                d="M20 60c18 10 38 10 56 0l-6 12c-16 8-28 8-44 0L20 60Z"
                fill="rgba(0,229,255,0.45)"
                opacity="0.8"
              />
            </motion.svg>
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } }}
              style={{ boxShadow: "0 0 50px rgba(0,229,255,0.25)" }}
            />
          </motion.div>
          <motion.p
            className="mt-6 font-mono text-xs uppercase tracking-[0.5em] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
          >
            Цифровой туман...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
