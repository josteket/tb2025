"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { featureFlags } from "@/lib/featureFlags";

interface CaseCardProps {
  title: string;
  summary: string;
  result: string;
  tags: string[];
  image: string;
  description: string;
}

export default function CaseCard({ title, summary, result, tags, image, description }: CaseCardProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const layoutId = useMemo(() => title.replace(/\s+/g, "-").toLowerCase(), [title]);
  const allowTransitions = featureFlags.enableCaseTransitions;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-120, 120], [8, -8]);
  const rotateY = useTransform(x, [-120, 120], [-8, 8]);
  const glowOpacity = useTransform(x, [-140, 140], [0.2, 0.7]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current || !allowTransitions) return;
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    if (!allowTransitions) return;
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const cardMotionProps = allowTransitions
    ? {
        style: { rotateX, rotateY },
        transition: { type: "spring", stiffness: 180, damping: 18 },
      }
    : {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          ref={cardRef}
          className="case-card h-full cursor-pointer"
          layoutId={`${layoutId}-wrapper`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => allowTransitions && setHovered(true)}
          onMouseLeave={handleMouseLeave}
          {...cardMotionProps}
          data-animate-item
        >
          <Card className="group h-full border-white/10 bg-background/40">
            <CardHeader className="relative overflow-hidden p-0">
              <motion.div layoutId={`${layoutId}-media`} className="relative h-56 w-full overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="case-video-mask object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <AnimatePresence>
                  {hovered && allowTransitions && (
                    <motion.div
                      key="hover-overlay"
                      className="absolute inset-0 bg-[linear-gradient(140deg,rgba(229,57,53,0.25),rgba(0,229,255,0.22))] mix-blend-screen"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 0.85, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
                <motion.div
                  aria-hidden
                  className="absolute inset-0 opacity-0"
                  style={{
                    opacity: allowTransitions ? glowOpacity : 0,
                    background:
                      "radial-gradient(circle at center, rgba(229,57,53,0.45), transparent 70%)",
                  }}
                />
                <motion.div
                  className="absolute inset-x-6 bottom-6 flex flex-col gap-2 text-left"
                  initial={false}
                  animate={{ y: hovered && allowTransitions ? 0 : 40, opacity: hovered && allowTransitions ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-silver">{result}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} className="bg-black/40 text-silver">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute inset-0 border border-white/10"
                layoutId={`${layoutId}-border`}
                aria-hidden
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-6">
              <motion.div layoutId={`${layoutId}-title`}>
                <CardTitle className="text-2xl text-text">{title}</CardTitle>
              </motion.div>
              <motion.div layoutId={`${layoutId}-summary`}>
                <CardDescription className="text-base text-muted">{summary}</CardDescription>
              </motion.div>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.45em] text-muted">Case</span>
                <Button variant="ghost" className="glow-hover" type="button">
                  Подробнее
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>

      <AnimatePresence>
        {allowTransitions && isClient && open && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.35),transparent_70%)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <DialogContent className="case-dialog relative flex h-[80vh] max-h-[720px] w-[min(960px,92vw)] max-w-none flex-col overflow-hidden border-white/10 bg-background/95 p-0">
        <motion.div
          layoutId={`${layoutId}-wrapper`}
          className="flex h-full flex-col overflow-hidden"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div layoutId={`${layoutId}-media`} className="relative h-72 w-full overflow-hidden">
            <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background/95" aria-hidden />
          </motion.div>
          <motion.div layoutId={`${layoutId}-border`} className="absolute inset-0 border border-white/10" aria-hidden />
          <div className="grid flex-1 grid-cols-1 gap-8 p-10 md:grid-cols-2">
            <div className="space-y-6">
              <DialogHeader className="items-start text-left">
                <motion.div layoutId={`${layoutId}-title`}>
                  <DialogTitle className="text-3xl leading-tight text-text">{title}</DialogTitle>
                </motion.div>
                <motion.div layoutId={`${layoutId}-summary`}>
                  <DialogDescription className="text-base text-muted">{summary}</DialogDescription>
                </motion.div>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-silver">{description}</p>
              <p className="font-semibold uppercase tracking-[0.2em] text-neon-cyan">Результат: {result}</p>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <Badge key={tag} className="bg-neon-purple/10 text-neon-purple">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6 text-sm text-muted">
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-[0.4em] text-silver">Тактический отчёт</h4>
                <ul className="space-y-2 text-left text-sm text-text/80">
                  <li>— Анализ рисков и резервных сценариев.</li>
                  <li>— Координация команд в реальном времени.</li>
                  <li>— Контроль качества без компромиссов.</li>
                </ul>
              </div>
              <DialogClose asChild>
                <Button variant="default" className="glow-hover self-start">
                  Закрыть
                </Button>
              </DialogClose>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
