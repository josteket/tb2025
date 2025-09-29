import { SectionHeading } from "@/components/SectionHeading";
import { CaseCard } from "@/components/CaseCard";
import { cases } from "@/data/cases";

export function Cases() {
  return (
    <section id="cases" className="relative py-24" data-hue-shift="#112c43">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading title="Кейсы" eyebrow="Боевая практика" />
        <div className="grid gap-8 md:grid-cols-2" data-animate="stagger">
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
      </div>
    </section>
  );
}
