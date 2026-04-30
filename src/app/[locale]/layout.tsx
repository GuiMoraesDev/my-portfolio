import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Lato, Fira_Sans } from "next/font/google";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { Spheres } from "@/components/atoms/Spheres";
import { TerminalContact } from "@/components/molecules/TerminalContact";
import { QueryProvider } from "@/provider/QueryProvider";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const firaSans = Fira_Sans({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-fira",
});

export const metadata: Metadata = {
  metadataBase: "https://www.guimoraes.dev/",
  referrer: "origin-when-cross-origin",
  keywords: ["confer-all", "Confer All", "Next.js", "React", "JavaScript"],
  authors: { name: "Guilherme Moraes", url: "https://github.com/GuiMoraesDev" },
  creator: "Guilherme Moraes",
  publisher: "Guilherme Moraes",
  title: "Guilherme Moraes | Software engineer",
  description:
    "I'm specialist in creating apps using Next.js, TypeScript, Node.js, automated tests, and more!",
  openGraph: {
    title: "Guilherme Moraes",
    description:
      "I'm specialist in creating apps using Next.js, TypeScript, Node.js, automated tests, and more!",
    url: "https://www.guimoraes.dev/",
    siteName: "Guilherme Moraes | Software engineer",
    images: [
      {
        url: "/cover/256p.png",
        width: 256,
        height: 256,
      },
      {
        url: "/cover/800p.png",
        width: 800,
        height: 600,
      },
      {
        url: "/cover/1800p.png",
        width: 1800,
        height: 1600,
      },
    ],
    locale: "en",
    type: "website",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  const messages = getMessages();

  return (
    <html className="scroll-smooth" data-scroll-behavior="smooth" lang={locale}>
      <body
        className={twMerge(
          "flex h-dvh w-full flex-col items-center gap-3 overflow-x-hidden bg-bg-canvas text-text-primary",
          lato.className,
          firaSans.className,
        )}
      >
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <main className="relative container flex flex-col items-center gap-12 bg-bg-canvas font-body text-text-primary">
              <Spheres />

              <TerminalContact />

              {children}
            </main>
            <Analytics />
            <SpeedInsights />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
