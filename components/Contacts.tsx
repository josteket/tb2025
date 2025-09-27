import SectionHeading from "@/components/SectionHeading";
import ContactCard from "@/components/ContactCard";

export default function Contacts() {
  return (
    <section id="contacts" className="relative py-24" data-bg-shift="120">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <SectionHeading title="Контакты" eyebrow="Включаемся мгновенно">
          Email: info@titans2059.ru · Телефон: +7 (999) 000-00-00 · Санкт-Петербург, Россия.
        </SectionHeading>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactCard />
          <div className="glass-panel flex flex-col justify-center gap-6 rounded-3xl border border-white/10 p-8" data-animate="fade-up">
            <h3 className="text-2xl font-semibold text-text">Как мы работаем</h3>
            <p className="text-sm text-muted">
              Анализируем задачу, выдаём план и берём на себя исполнение. От первого звонка до закрытия проекта — в диалоге и с
              полной прозрачностью.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-[0.35em] text-muted">
              <span className="rounded-full border border-neon-cyan/40 px-3 py-1">Планирование</span>
              <span className="rounded-full border border-neon-purple/40 px-3 py-1">Контроль</span>
              <span className="rounded-full border border-accent-red/40 px-3 py-1">Ответственность</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
