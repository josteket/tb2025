import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  className?: string;
}

export function SectionHeading({ title, eyebrow, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 flex flex-col gap-3", className)}>
      {eyebrow ? (
        <motion.span
          className="text-sm font-mono uppercase tracking-[0.35em] text-neon-cyan"
          data-animate="fade-up"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2
        className="text-3xl font-semibold tracking-tight text-text md:text-4xl lg:text-5xl"
        data-animate="fade-up"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="relative inline-flex flex-col">
          <span className="relative z-10">{title}</span>
          <span className="absolute inset-x-0 bottom-1 h-2 bg-gradient-to-r from-accent-red/30 via-neon-cyan/30 to-neon-purple/30" />
        </span>
      </motion.h2>
    </div>
  );
}
