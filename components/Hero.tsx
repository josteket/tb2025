"use client";

import type { MouseEvent } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GridBackdrop } from "@/components/GridBackdrop";

const DynamicHeroCanvas = dynamic(() => import("@/components/HeroCanvas").then((mod) => mod.HeroCanvas), {
  ssr: false,
  loading: () => <div className="h-[420px]" />
});

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-24">
      <GridBackdrop />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-16 px-6 lg:flex-row lg:items-center">
        <div className="relative z-10 flex-1 space-y-8" data-animate="fade-up">
          <motion.span
            className="inline-flex items-center gap-3 rounded-full border border-neon-cyan/40 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.35em] text-neon-cyan"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Режим «Спарта» активирован
          </motion.span>
          <motion.h1
            className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Мы делаем сложное — простым. Надёжно. В срок.
          </motion.h1>
          <motion.p
            className="max-w-xl text-base text-muted md:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          >
            Объединяем дисциплину и технологии, чтобы давать заказчикам результат, который выдерживает любые дедлайны и проверки.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
          >
            <Button asChild className="shadow-glow">
              <a href="#contacts" onClick={(event) => smoothScroll(event, "#contacts")}>Связаться</a>
            </Button>
            <Button
              variant="secondary"
              className="border-neon-cyan text-neon-cyan"
              asChild
            >
              <a href="#cases" onClick={(event) => smoothScroll(event, "#cases")}>
                Кейсы
              </a>
            </Button>
          </motion.div>
        </div>
        <div className="relative z-0 flex-1">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#00E5FF22,transparent_60%)]" />
          <div className="relative h-[420px] rounded-[3rem] border border-white/10 bg-black/40 shadow-glow">
            <DynamicHeroCanvas />
            <motion.div
              className="absolute inset-0 rounded-[3rem] border border-white/10"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.div
            className="mt-6 flex items-center gap-4 text-sm text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neon-cyan/40 bg-white/5 font-mono text-xs uppercase tracking-[0.35em] text-neon-cyan">
              R
            </span>
            <p>
              Процедурная low-poly модель шлема. Заменить на реальный GLB в public/models/helmet.glb при необходимости.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function smoothScroll(event: MouseEvent<HTMLAnchorElement>, selector: string) {
  event.preventDefault();
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
