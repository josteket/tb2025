"use client";

import { type ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  children: ReactNode;
}

export function Preloader({ children }: PreloaderProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence>{loaded ? null : <PreloaderOverlay />}</AnimatePresence>
      <div className={loaded ? "opacity-100" : "opacity-0 transition-opacity duration-300"}>{children}</div>
    </>
  );
}

function PreloaderOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.div
        className="relative flex h-40 w-40 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-neon-cyan/30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-6 rounded-full border border-accent-red/50"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <motion.svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          initial={{ scale: 0.85 }}
          animate={{ scale: [0.85, 1, 0.85] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          <path
            d="M48 6 L82 26 L82 70 L48 90 L14 70 L14 26 Z"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E53935" />
              <stop offset="50%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>
        </motion.svg>
        <motion.div
          className="absolute top-full mt-6 text-center font-mono text-xs uppercase tracking-[0.5em] text-muted"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          Спартанский запуск
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
