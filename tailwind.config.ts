import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        "background-2": "var(--bg-2)",
        text: "var(--text)",
        muted: "var(--muted)",
        "accent-red": "var(--accent-red)",
        "neon-cyan": "var(--neon-cyan)",
        "neon-purple": "var(--neon-purple)",
        silver: "var(--silver)",
        border: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["var(--font-jetbrains)", ...fontFamily.mono],
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 229, 255, 0.45)",
        accent: "0 0 45px rgba(168, 85, 247, 0.35)",
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at center, rgba(0,229,255,0.15) 0%, transparent 65%)",
      },
      animation: {
        "pulse-slow": "pulse 6s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-2%)" },
          "50%": { transform: "translateY(2%)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
