import SectionHeading from "@/components/SectionHeading";
import StatPill from "@/components/StatPill";

const values = [
  "Надёжность как стандарт.",
  "Скорость без хаоса.",
  "Честные сметы и контроль качества.",
  "Коммуникация на человеческом языке.",
];

const stats = [
  { value: 10, label: "10/10 — выполненных обязательств" },
  { value: 24, label: "24/7 — на связи по ключевым проектам" },
  { value: 100, label: "100% — прозрачность работ и бюджета" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24" data-bg-shift="25">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <SectionHeading title="О компании" eyebrow="Фокус на результате">
          «„Титаны будущего“ — команда, родившаяся из практики. Мы не обещаем — мы делаем. Готовы брать ответственность, держать
          слово и закрывать задачи под ключ. В основе — инженерная точность, прозрачные процессы и уважение к срокам.»
        </SectionHeading>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6" data-animate="fade-up">
            <p className="text-lg text-muted">
              Миссия: «Объединяем дисциплину и технологии, чтобы давать заказчикам результат, который выдерживает любые дедлайны и проверки.»
            </p>
            <ul className="grid gap-3 text-sm text-silver">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neon-cyan" aria-hidden />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4" data-animate="fade-up">
            {stats.map((stat) => (
              <StatPill key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
