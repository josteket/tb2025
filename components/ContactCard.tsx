"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Copy } from "lucide-react";

export default function ContactCard() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("info@titans2059.ru");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="glass-panel flex flex-col gap-6 rounded-3xl border border-white/10 p-8">
      <h3 className="text-2xl font-semibold text-text">Всегда на связи</h3>
      <p className="text-sm text-muted">
        Мы отвечаем быстро и предметно. Напишите или позвоните — обсудим задачу и предложим решение.
      </p>
      <div className="space-y-4 text-sm text-muted">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-neon-cyan" aria-hidden />
          <a href="mailto:info@titans2059.ru" className="hover:text-text">
            info@titans2059.ru
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-neon-cyan" aria-hidden />
          <a href="tel:+79990000000" className="hover:text-text">
            +7 (999) 000-00-00
          </a>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-5 w-5 text-neon-cyan" aria-hidden />
          <p>Санкт-Петербург, Россия</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href="mailto:info@titans2059.ru?subject=Запрос%20от%20клиента">Написать на почту</a>
        </Button>
        <Button type="button" variant="secondary" onClick={copyEmail}>
          <Copy className="mr-2 h-4 w-4" />
          {copied ? "Скопировано" : "Скопировать email"}
        </Button>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
        <Image
          src="/placeholder.svg"
          alt="Заглушка карты"
          width={1200}
          height={800}
          className="h-48 w-full object-cover opacity-90"
        />
      </div>
    </div>
  );
}
