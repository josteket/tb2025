"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setIsLoaded(true);
    }, 2400);
    return () => window.clearTimeout(handle);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-[#050d16]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.35),transparent_65%)] mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.4] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          />
          <motion.div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 space-y-6 text-center text-text"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
          >
            <motion.div
              className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-glow"
              initial={{ scale: 0.8, rotate: -8 }}
              animate={{ scale: [0.8, 1, 0.94, 1], rotate: [0, 6, -4, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.svg
                width="88"
                height="88"
                viewBox="0 0 88 88"
                className="text-neon-cyan"
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.8 } }}
              >
                <defs>
                  <linearGradient id="spartan-mask" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--neon-cyan)" />
                    <stop offset="50%" stopColor="var(--neon-purple)" />
                    <stop offset="100%" stopColor="var(--accent-red)" />
                  </linearGradient>
                </defs>
                <path
                  d="M44 8c13 0 24 11 24 24 0 5-1.5 9.7-4.2 13.6L71 72H61l-5-14h-6l-5 14H35l7.2-26.4C38.5 41.7 36 37 36 32 36 19 31 16 44 8Z"
                  fill="url(#spartan-mask)"
                  fillOpacity="0.9"
                />
                <path
                  d="M28 68c10 6 22 6 32 0l-4 8c-8 4-16 4-24 0l-4-8Z"
                  fill="rgba(229,57,53,0.6)"
                />
              </motion.svg>
            </motion.div>
            <motion.p
              className="font-mono text-[0.75rem] uppercase tracking-[0.7em] text-silver"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.7em" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
            >
              Титаны будущего
            </motion.p>
            <motion.p
              className="text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.9 } }}
            >
              Подготовка к бою
            </motion.p>
          </motion.div>
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
          >
            <div className="blood-fog" aria-hidden />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
