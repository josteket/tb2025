import { SectionHeading } from "@/components/SectionHeading";
import { StatPill } from "@/components/StatPill";

const values = [
  "Надёжность как стандарт.",
  "Скорость без хаоса.",
  "Честные сметы и контроль качества.",
  "Коммуникация на человеческом языке."
];

export function About() {
  return (
    <section id="about" className="relative py-24" data-hue-shift="#0F2638">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading title="О компании" eyebrow="Боевой состав" />
        <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6 text-lg text-muted">
            <p className="text-text">
              «Титаны будущего» — команда, родившаяся из практики. Мы не обещаем — мы делаем. Готовы брать ответственность,
              держать слово и закрывать задачи под ключ. В основе — инженерная точность, прозрачные процессы и уважение к срокам.
            </p>
            <ul className="space-y-4 text-sm text-muted" data-animate="fade-up">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent-red" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4" data-animate="stagger">
            <StatPill value={10} suffix="/10" label="выполненных обязательств" />
            <StatPill value={24} suffix="/7" label="на связи по ключевым проектам" />
            <StatPill value={100} suffix="%" label="прозрачность работ и бюджета" />
          </div>
        </div>
      </div>
    </section>
  );
}
