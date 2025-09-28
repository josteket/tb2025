import SectionHeading from "@/components/SectionHeading";
import CaseCard from "@/components/CaseCard";
import { cases } from "@/data/cases";
import { LayoutGroup } from "framer-motion";

export default function Cases() {
  return (
    <section id="cases" className="relative py-24" data-bg-shift="80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <SectionHeading title="Кейсы" eyebrow="Без права на ошибку">
          Кейсы, которые показывают наш подход: точность планирования, контроль исполнения и результат, за который отвечаем.
        </SectionHeading>
        <LayoutGroup id="cases">
          <div className="grid gap-8 md:grid-cols-2" data-animate="stagger">
            {cases.map((project) => (
              <CaseCard key={project.title} {...project} />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
