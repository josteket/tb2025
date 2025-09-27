"use client";

import { useEffect, useRef } from "react";
import { featureFlags } from "@/lib/featureFlags";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!featureFlags.enableCursorTrail) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: { x: number; y: number; life: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const spawn = (x: number, y: number) => {
      particles.push({ x, y, life: 1 });
    };

    let animationFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.02;
        p.y -= 0.4;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = Math.max(p.life, 0);
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 20);
        gradient.addColorStop(0, `rgba(0, 229, 255, ${alpha})`);
        gradient.addColorStop(1, "rgba(0, 229, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const onMove = (event: MouseEvent) => {
      spawn(event.clientX, event.clientY);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-20 hidden md:block" aria-hidden />;
}
