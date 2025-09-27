"use client";

import { useEffect } from "react";
import { featureFlags } from "./featureFlags";
import type { Context } from "gsap";

export const useScrollAnimations = () => {
  useEffect(() => {
    if (!featureFlags.enableScrollAnimations) return;

    let ctx: Context | null = null;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsapModule.gsap.registerPlugin(ScrollTrigger);

      ctx = gsapModule.gsap.context(() => {
        gsapModule.gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']").forEach((element) => {
          gsapModule.gsap.fromTo(
            element,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
              },
            }
          );
        });

        gsapModule.gsap.utils.toArray<HTMLElement>("[data-animate='stagger']").forEach((container) => {
          const items = container.querySelectorAll("[data-animate-item]");
          gsapModule.gsap.set(items, { opacity: 0, y: 40, rotateX: -10 });

          ScrollTrigger.batch(items, {
            onEnter: (batch) =>
              gsapModule.gsap.to(batch, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
              }),
          });
        });

        gsapModule.gsap.utils.toArray<HTMLElement>("[data-bg-shift]").forEach((section) => {
          const hue = section.dataset.bgShift ?? "0";
          gsapModule.gsap.to(section, {
            background: `linear-gradient(135deg, rgba(0, 229, 255, 0.12), rgba(168, 85, 247, 0.12))`,
            filter: `hue-rotate(${hue}deg)`,
            scrollTrigger: {
              trigger: section,
              start: "top center",
              scrub: true,
            },
          });
        });
      });
    })();

    return () => {
      ctx?.revert();
    };
  }, []);
};

export const useCounter = (value: number, ref: React.RefObject<HTMLSpanElement>) => {
  useEffect(() => {
    let ctx: Context | null = null;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsapModule.gsap.registerPlugin(ScrollTrigger);

      if (!ref.current) return;

      ctx = gsapModule.gsap.context(() => {
        gsapModule.gsap.fromTo(
          ref.current,
          { innerText: 0 },
          {
            innerText: value,
            duration: 1.8,
            snap: { innerText: 1 },
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              once: true,
            },
            onUpdate: function () {
              if (!ref.current) return;
              ref.current.innerText = Math.round(Number(this.targets()[0].innerText)).toString();
            },
          }
        );
      });
    })();

    return () => ctx?.revert();
  }, [ref, value]);
};
