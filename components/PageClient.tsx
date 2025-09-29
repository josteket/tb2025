"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Cases } from "@/components/Cases";
import { Contacts } from "@/components/Contacts";
import { ScrollProgress } from "@/components/ScrollProgress";
import { useScrollAnimations, startCursorTrail } from "@/lib/animations";
import { getFeatureFlags } from "@/lib/featureFlags";

export function PageClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const flags = getFeatureFlags(prefersReducedMotion);
  useScrollAnimations({ containerRef });

  useEffect(() => {
    if (!flags.enableCursorTrail) return;
    const cleanup = startCursorTrail({ parent: containerRef.current ?? document.body });
    return () => {
      cleanup?.();
    };
  }, [flags.enableCursorTrail]);

  return (
    <Preloader>
      <div ref={containerRef} className={prefersReducedMotion ? "reduced-motion" : undefined}>
        {flags.enableNoiseOverlay ? <div className="noise-overlay" /> : null}
        <Header />
        <main className="relative">
          <Hero />
          <About />
          <Cases />
          <Contacts />
        </main>
        <Footer />
        <ScrollProgress />
      </div>
    </Preloader>
  );
}
