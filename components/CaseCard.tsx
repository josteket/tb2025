"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Case } from "@/data/cases";

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAnIGhlaWdodD0nMjAnIHZpZXdCb3g9JzAgMCAyMCAyMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nMjAnIGhlaWdodD0nMjAnIGZpbGw9JyMwQjFFMkQnLz48L3N2Zz4=";

interface CaseCardProps {
  caseItem: Case;
}

export function CaseCard({ caseItem }: CaseCardProps) {
  return (
    <motion.div
      data-animate-child
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Card className="group h-full cursor-pointer overflow-hidden border-white/10 bg-surface/60 backdrop-blur-xl">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={caseItem.image}
                alt={caseItem.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              <Badge className="absolute left-4 top-4 bg-accent-red/10 text-accent-red">
                Spartan Mode
              </Badge>
            </div>
            <CardContent className="flex h-full flex-col gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-text">{caseItem.title}</h3>
                <p className="text-sm text-muted">{caseItem.summary}</p>
              </div>
              <div className="mt-auto flex items-center justify-between text-sm text-neon-cyan">
                <span>{caseItem.result}</span>
                <span className="flex items-center gap-2 text-xs text-muted">
                  {caseItem.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </span>
              </div>
              <Button
                variant="secondary"
                className="mt-4 w-full justify-center border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
              >
                Подробнее
              </Button>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{caseItem.title}</DialogTitle>
            <DialogDescription>{caseItem.summary}</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-text/80">{caseItem.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {caseItem.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-neon-cyan/40 text-neon-cyan">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
