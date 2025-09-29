import { SectionHeading } from "@/components/SectionHeading";
import { ContactCard } from "@/components/ContactCard";

export function Contacts() {
  return (
    <section id="contacts" className="relative py-24" data-hue-shift="#0c1f30">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading title="Контакты" eyebrow="Связь 24/7" />
        <ContactCard />
      </div>
    </section>
  );
}
