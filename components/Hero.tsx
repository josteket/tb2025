"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

export default function Hero() {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;

    if ("requestIdleCallback" in window) {
      idleHandle = (window as typeof window & { requestIdleCallback: (cb: IdleRequestCallback) => number }).requestIdleCallback(
        () => setShowCanvas(true)
      );
    } else {
      timeoutHandle = window.setTimeout(() => setShowCanvas(true), 150);
    }

    return () => {
      if (idleHandle !== null) {
        (window as typeof window & { cancelIdleCallback: (handle: number) => void }).cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, []);

  const scrollToContacts = () => {
    document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-32">
      {showCanvas && <HeroCanvas />}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 px-6 md:flex-row">
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.4em] text-muted">
            ООО «Титаны будущего»
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-text md:text-5xl">
            Мы делаем сложное — простым. Надёжно. В срок.
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Объединяем дисциплину и технологии, чтобы давать заказчикам результат, который выдерживает любые дедлайны и проверки.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={scrollToContacts} className="glow-hover" variant="default">
              Перейти к контактам
            </Button>
            <Button onClick={scrollToContacts} variant="ghost">
              Связаться
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="relative flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-neon-cyan/10 blur-3xl" aria-hidden />
            <motion.div
              whileHover={{ rotateZ: 2, scale: 1.05 }}
              className="relative h-72 w-72 overflow-hidden rounded-full border border-white/10 bg-white/5 p-6 shadow-glow"
            >
              <Image
                src="/placeholder.svg"
                alt="Заглушка логотипа"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 280px, 360px"
              />
              <div className="absolute inset-0 animate-pulse-slow bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.35),transparent_60%)] mix-blend-screen" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
