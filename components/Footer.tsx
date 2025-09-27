import Link from "next/link";

const footerLinks = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Кейсы", href: "#cases" },
  { label: "Контакты", href: "#contacts" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-muted">
            © Титаны будущего, 2025
          </p>
          <p className="mt-2 max-w-md text-sm text-muted">
            Технологичный подход, дисциплина и результат. Мы делаем сложное — простым.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-neon-cyan" scroll>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-muted">
          <a href="https://t.me/titans" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan">
            Telegram
          </a>
          <a href="https://vk.com/titans" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan">
            VK
          </a>
          <a href="https://rutube.ru/channel/titans" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan">
            Rutube
          </a>
        </div>
      </div>
    </footer>
  );
}
