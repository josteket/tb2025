import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import clsx from "clsx";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GridBackdrop from "@/components/GridBackdrop";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import RouteTransition from "@/components/RouteTransition";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Титаны будущего — делаем сложное простым",
  description:
    "Технологичный подход, дисциплина и результат. „Титаны будущего“ — когда нужно надёжно и в срок.",
  metadataBase: new URL("https://titans-future.local"),
  openGraph: {
    title: "Титаны будущего — делаем сложное простым",
    description:
      "Технологичный подход, дисциплина и результат. „Титаны будущего“ — когда нужно надёжно и в срок.",
    type: "website",
    locale: "ru_RU",
    url: "https://titans-future.local",
    siteName: "Титаны будущего",
    images: [
      {
        url: "/placeholder.svg",
        width: 1200,
        height: 630,
        alt: "ООО «Титаны будущего»",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Титаны будущего — делаем сложное простым",
    description:
      "Технологичный подход, дисциплина и результат. „Титаны будущего“ — когда нужно надёжно и в срок.",
    images: ["/placeholder.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={clsx(inter.variable, jetbrains.variable, "relative min-h-screen bg-background")}> 
        <Preloader />
        <RouteTransition />
        <GridBackdrop />
        <Header />
        <main className="relative z-10 flex min-h-screen flex-col pt-20" id="top">
          {children}
        </main>
        <Footer />
        <ScrollProgress />
      </body>
    </html>
  );
}
