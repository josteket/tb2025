"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#hero", label: "Главная" },
  { href: "#about", label: "О компании" },
  { href: "#cases", label: "Кейсы" },
  { href: "#contacts", label: "Контакты" }
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const sections = navItems.map((item) => document.querySelector(item.href));
      for (const section of sections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.35) {
          setActive(`#${section.id}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.history.pushState(null, "", href);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all",
        scrolled ? "backdrop-blur-xl" : ""
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4",
          scrolled ? "glass-panel border-white/10" : ""
        )}
      >
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-neon-cyan/40 bg-white/5 shadow-glow">
            <Image
              src="/logo.png"
              alt="Логотип Титанов будущего"
              fill
              sizes="48px"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNjQnIGhlaWdodD0nNjQnIHZpZXdCb3g9JzAgMCA2NCA2NCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nNjQnIGhlaWdodD0nNjQnIGZpbGw9JyMwQjFFMkQnIHJ4PScxMicvPjx0ZXh0IHg9JzUwJScgeT0nNTAlJyBkb21pbmFudC1iYXNlbGluZT0nbWlkZGxlJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmaWxsPScjRTZFRkYzJyBmb250LXNpemU9JzEwJyBmb250LWZhbWlseT0nSW50ZXIsIHN5c3RlbS1VSSwgU2Fucy1TZXJpZic+TG9nbyA8L3RleHQ+PC9zdmc+"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs uppercase tracking-[0.45em] text-neon-cyan/80">ООО</span>
            <span className="text-lg font-semibold text-text">Титаны будущего</span>
          </div>
        </motion.div>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
              className={cn(
                "relative text-sm font-medium uppercase tracking-[0.3em] transition",
                active === item.href ? "text-neon-cyan" : "text-muted hover:text-text"
              )}
            >
              {item.label}
              {active === item.href ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-accent-red via-neon-cyan to-neon-purple"
                />
              ) : null}
            </a>
          ))}
        </nav>
        <Button className="hidden md:inline-flex" asChild>
          <a href="mailto:info@titans2059.ru?subject=Запрос%20от%20клиента">Связаться</a>
        </Button>
        <Button variant="ghost" className="md:hidden" aria-label="Открыть меню">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
