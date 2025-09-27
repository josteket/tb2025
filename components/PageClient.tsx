"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Cases from "@/components/Cases";
import Contacts from "@/components/Contacts";
import { useScrollAnimations } from "@/lib/animations";

export default function PageClient() {
  useScrollAnimations();

  return (
    <>
      <Hero />
      <About />
      <Cases />
      <Contacts />
    </>
  );
}
