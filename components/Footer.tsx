const footerLinks = [
  { href: "#hero", label: "Главная" },
  { href: "#about", label: "О компании" },
  { href: "#cases", label: "Кейсы" },
  { href: "#contacts", label: "Контакты" }
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-surface/60 py-10 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-text">© Титаны будущего, 2025</p>
          <p className="text-sm text-muted">Дисциплина. Технологии. Результат.</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-muted">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-neon-cyan">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-muted">
          <a href="https://t.me/titans" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan">
            Telegram
          </a>
          <a href="https://vk.com/titans" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan">
            VK
          </a>
        </div>
      </div>
    </footer>
  );
}
