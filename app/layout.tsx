import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { inter, jetbrains } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://oootb.pro"),
  title: "Титаны будущего — делаем сложное простым",
  description: "Технологичный подход, дисциплина и результат. «Титаны будущего» — когда нужно надёжно и в срок.",
  openGraph: {
    title: "Титаны будущего — делаем сложное простым",
    description:
      "Технологичный подход, дисциплина и результат. «Титаны будущего» — когда нужно надёжно и в срок.",
    type: "website",
    locale: "ru_RU",
    url: "https://oootb.pro",
    images: [
      {
        url: "/placeholder.svg",
        width: 1200,
        height: 630,
        alt: "ООО «Титаны будущего»"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Титаны будущего — делаем сложное простым",
    description:
      "Технологичный подход, дисциплина и результат. «Титаны будущего» — когда нужно надёжно и в срок.",
    images: ["/placeholder.svg"]
  },
  icons: {
    icon: "/favicon.ico"
  },
  alternates: {
    canonical: "https://oootb.pro"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>{children}</body>
    </html>
  );
}
