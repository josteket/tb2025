"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function RouteTransition() {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (!pathname) return;
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    setIsAnimating(true);
    const timeout = window.setTimeout(() => setIsAnimating(false), 900);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          key={pathname}
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-black" />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.6),transparent_60%)] mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.6, 0.35] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,229,255,0.15)_0%,rgba(168,85,247,0.25)_45%,rgba(229,57,53,0.35)_100%)] opacity-70"
            initial={{ scale: 1.2, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-[0.7em] text-silver"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.7em" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            \u0422\u0418\u0422\u0410\u041d\u042b
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
