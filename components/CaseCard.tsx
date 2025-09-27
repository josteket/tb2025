"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
} from "@/components/ui/dialog";
import { useState } from "react";

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

  return (
    <motion.div
      whileHover={{ y: -6, rotateX: 1.5 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      data-animate-item
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="group h-full cursor-pointer overflow-hidden border-white/5 bg-white/5">
            <CardHeader className="relative">
              <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" aria-hidden />
              </div>
              <CardTitle className="mt-4 flex items-center justify-between">
                {title}
                <span className="text-xs font-mono uppercase tracking-[0.35em] text-muted">Case</span>
              </CardTitle>
              <CardDescription>{summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-silver">{result}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <Button className="self-start" variant="default">
                Подробнее
              </Button>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              <span className="block text-sm text-muted">{summary}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-left text-sm text-muted">
            <p className="text-base text-text">{description}</p>
            <p className="font-semibold text-neon-cyan">Результат: {result}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} className="bg-neon-purple/10 text-neon-purple">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
