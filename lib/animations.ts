"use client";

import type { MutableRefObject } from "react";
import { useEffect } from "react";
import type { Context as GsapContext } from "gsap";
import { useReducedMotion } from "framer-motion";
import { featureFlags, getFeatureFlags } from "./featureFlags";

type AnimationsOptions = {
  containerRef: MutableRefObject<HTMLElement | null>;
};

export function useScrollAnimations({ containerRef }: AnimationsOptions) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const flags = getFeatureFlags(prefersReducedMotion);
    if (!flags.enableGsapScroll) {
      return;
    }

    let ctx: GsapContext | undefined;
    let scrollTrigger: typeof import("gsap/ScrollTrigger") | undefined;

    async function load() {
      const gsapModule = await import("gsap");
      scrollTrigger = await import("gsap/ScrollTrigger");
      gsapModule.gsap.registerPlugin(scrollTrigger.ScrollTrigger);

      ctx = gsapModule.gsap.context(() => {
        gsapModule.gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']").forEach((el) => {
          gsapModule.gsap.fromTo(
            el,
            { y: 64, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%"
              }
            }
          );
        });

        gsapModule.gsap.utils.toArray<HTMLElement>("[data-animate='stagger']").forEach((group) => {
          const targets = group.querySelectorAll<HTMLElement>("[data-animate-child]");
          gsapModule.gsap.fromTo(
            targets,
            { y: 40, autoAlpha: 0, rotateX: -10 },
            {
              y: 0,
              rotateX: 0,
              autoAlpha: 1,
              duration: 1.1,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: group,
                start: "top 80%"
              }
            }
          );
        });

        gsapModule.gsap.utils.toArray<HTMLElement>("[data-hue-shift]").forEach((section) => {
          const color = section.dataset.hueShift ?? "#0F2638";
          gsapModule.gsap.to("body", {
            backgroundColor: color,
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 20%",
              scrub: true
            }
          });
        });
      }, containerRef.current ?? undefined);
    }

    load();

    return () => {
      scrollTrigger?.ScrollTrigger?.getAll().forEach((trigger) => trigger.kill());
      ctx?.revert();
    };
  }, [containerRef, prefersReducedMotion]);
}

type CursorTrailOptions = {
  parent: HTMLElement | null;
};

export function startCursorTrail({ parent }: CursorTrailOptions): (() => void) | undefined {
  if (!parent || !featureFlags.enableCursorTrail) return undefined;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const trail = document.createElement("div");
  trail.style.position = "fixed";
  trail.style.inset = "0";
  trail.style.pointerEvents = "none";
  trail.style.zIndex = "30";
  parent.appendChild(trail);

  const sparks: HTMLDivElement[] = [];
  const maxSparks = 18;

  function spawnSpark(x: number, y: number) {
    const spark = document.createElement("div");
    spark.className = "pointer-events-none fixed w-2 h-2 rounded-full bg-neon-cyan mix-blend-screen";
    spark.style.left = `${x - 4}px`;
    spark.style.top = `${y - 4}px`;
    spark.style.opacity = "0.8";
    spark.style.boxShadow = "0 0 12px rgba(0, 229, 255, 0.55)";
    trail.appendChild(spark);
    sparks.push(spark);

    requestAnimationFrame(() => {
      spark.style.transition = "transform 0.6s ease, opacity 0.6s ease";
      spark.style.transform = "translateY(-24px) scale(0)";
      spark.style.opacity = "0";
    });

    window.setTimeout(() => {
      spark.remove();
      const idx = sparks.indexOf(spark);
      if (idx >= 0) sparks.splice(idx, 1);
    }, 600);
  }

  function onMove(event: MouseEvent) {
    if (sparks.length > maxSparks) {
      const oldest = sparks.shift();
      oldest?.remove();
    }
    spawnSpark(event.clientX, event.clientY);
  }

  window.addEventListener("pointermove", onMove);

  return () => {
    window.removeEventListener("pointermove", onMove);
    trail.remove();
  };
}
