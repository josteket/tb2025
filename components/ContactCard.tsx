"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ContactCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("info@titans2059.ru");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Clipboard copy failed", error);
    }
  };

  return (
    <Card className="grid gap-8 border-white/10 bg-surface/80 p-0 md:grid-cols-[1fr,280px]">
      <CardContent className="space-y-6 p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-accent-red/60 bg-accent-red/10 p-3 text-accent-red">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Давайте обсудим задачу</h3>
            <p className="text-sm text-muted">Готовы к срочным запросам 24/7.</p>
          </div>
        </div>
        <div className="space-y-4 text-sm text-muted">
          <p className="flex items-center gap-3 text-text">
            <Mail className="h-5 w-5 text-neon-cyan" /> info@titans2059.ru
          </p>
          <p className="flex items-center gap-3 text-text">
            <Phone className="h-5 w-5 text-neon-cyan" /> +7 (999) 000-00-00
          </p>
          <p className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-neon-cyan" /> Санкт-Петербург, Россия
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="shadow-glow">
            <a href="mailto:info@titans2059.ru?subject=Запрос%20от%20клиента" aria-label="Написать на почту">
              Написать на почту
            </a>
          </Button>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              className="border-neon-cyan text-neon-cyan"
              onClick={handleCopy}
            >
              {copied ? "Email скопирован" : "Скопировать email"}
            </Button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email скопирован" : ""}
            </span>
          </div>
        </div>
      </CardContent>
      <div className="relative min-h-[220px] overflow-hidden border-t border-white/10 md:border-l md:border-t-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-red/20 via-transparent to-neon-cyan/10" />
        <div className="relative flex h-full flex-col items-start justify-end gap-4 p-8 text-sm text-muted">
          <p className="font-mono uppercase tracking-[0.25em] text-silver/70">Карта офиса</p>
          <p className="max-w-[240px] text-xs text-muted">
            Замените на статичный снимок карты или встраиваемый виджет. Сейчас используется заглушка.
          </p>
          <div className="h-24 w-full rounded-2xl border border-white/10 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-80" />
        </div>
      </div>
    </Card>
  );
}
