"use client";

import { useEffect, useRef } from "react";
import { featureFlags } from "@/lib/featureFlags";

export default function GridBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid(0);
    };

    const drawGrid = (time: number) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(11, 30, 45, 0.85)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gridSize = 80;
      ctx.strokeStyle = "rgba(0, 229, 255, 0.08)";
      ctx.lineWidth = 1;

      const offset = (time * 0.02) % gridSize;

      for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, canvas.height);
        ctx.stroke();
      }
      for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(canvas.width, y + offset);
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(0, 229, 255, 0.05)";
      for (let i = 0; i < 120; i++) {
        const x = (Math.random() * canvas.width) % canvas.width;
        const y = (Math.random() * canvas.height + time * 0.05) % canvas.height;
        ctx.fillRect(x, y, 2, 2);
      }
    };

    const render = (time: number) => {
      drawGrid(time);
      animationFrame = requestAnimationFrame(render);
    };

    if (featureFlags.enableParticles) {
      render(0);
    } else {
      drawGrid(0);
    }

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="h-full w-full opacity-60 mix-blend-screen" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" aria-hidden />
    </div>
  );
}
