import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1E2D",
        surface: "#0F2638",
        text: "#E6ECF3",
        muted: "#9BA8B6",
        "accent-red": "#E53935",
        "neon-cyan": "#00E5FF",
        "neon-purple": "#A855F7",
        silver: "#CFD8E3"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"]
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      },
      boxShadow: {
        glow: "0 0 35px rgba(0, 229, 255, 0.35)",
        "glow-strong": "0 0 45px rgba(229, 57, 53, 0.45)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" }
        }
      },
      animation: {
        shimmer: "shimmer 8s linear infinite",
        glitch: "glitch 1.2s steps(2, jump-none) infinite"
      }
    }
  },
  plugins: [animatePlugin]
};

export default config;
