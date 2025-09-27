"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Кейсы", href: "#cases" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-white/10" : "bg-transparent"
      }`}
      aria-label="Главная навигация"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => handleNav("#hero")}
          className="group flex items-center gap-3 focus-outline"
          aria-label="Перейти к началу"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white/5">
            <Image src="/placeholder.svg" alt="Заглушка логотипа" fill sizes="40px" className="object-cover" priority />
            <span className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
          </div>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            ООО «Титаны будущего»
          </span>
        </button>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Разделы сайта">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className={`relative text-sm font-semibold uppercase tracking-[0.25em] transition text-muted hover:text-text focus-outline ${
                active === item.href ? "text-text" : ""
              }`}
            >
              {item.label}
              {active === item.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple"
                  aria-hidden
                />
              )}
            </button>
          ))}
          <Link
            href="#contacts"
            onClick={(event) => {
              event.preventDefault();
              handleNav("#contacts");
            }}
            className="glow-hover rounded-full border border-neon-cyan/40 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-neon-cyan shadow-glow"
          >
            Связаться
          </Link>
        </nav>
        <button
          className="md:hidden focus-outline"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Открыть меню"
        >
          <Menu className="h-6 w-6 text-neon-cyan" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="glass-panel mx-4 mb-4 flex flex-col gap-3 rounded-2xl border border-white/10 p-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="text-left text-sm font-semibold uppercase tracking-[0.2em] text-muted"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("#contacts")}
                className="mt-2 rounded-full border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-neon-cyan"
              >
                Связаться
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
