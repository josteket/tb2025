import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ title, eyebrow, children }: { title: string; eyebrow?: string; children?: ReactNode }) {
  return (
    <motion.div
      className="mb-10 max-w-3xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {eyebrow && (
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1 text-xs font-mono uppercase tracking-[0.35em] text-neon-cyan">
          {eyebrow}
        </div>
      )}
      <h2 className="relative text-3xl font-semibold tracking-tight text-text md:text-4xl">
        <span className="pr-16">{title}</span>
        <span className="absolute bottom-2 left-0 h-[1px] w-16 bg-gradient-to-r from-neon-cyan to-transparent" aria-hidden />
      </h2>
      {children && <p className="mt-4 text-lg text-muted">{children}</p>}
    </motion.div>
  );
}
