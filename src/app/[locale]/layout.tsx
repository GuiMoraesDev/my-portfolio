import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Lato, Fira_Sans } from "next/font/google";
import "@/styles/globals.css";
import { twMerge } from "tailwind-merge";

import { Toaster } from "@/components/atoms/Toaster";
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
  metadataBase: new URL("https://www.guimoraes.dev/"),
  referrer: "origin-when-cross-origin",
  keywords: ["confer-all", "Confer All", "Next.js", "React", "JavaScript"],
  authors: { name: "Guilherme Moraes", url: "https://github.com/GuiMoraesDev" },
  creator: "Guilherme Moraes",
  publisher: "Guilherme Moraes",
  title: "Guilherme Moraes | Software engineer",
  description:
    "I'm specialist in creating apps using Next.js, TypeScript, Node.js, automated tests, and more!",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Guilherme Moraes",
    description:
      "I'm specialist in creating apps using Next.js, TypeScript, Node.js, automated tests, and more!",
    url: "/",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Guilherme Moraes | Software engineer",
    description:
      "I'm specialist in creating apps using Next.js, TypeScript, Node.js, automated tests, and more!",
    creator: "Guilherme Moraes",
    images: ["/cover/800p.png"],
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={twMerge(
          "flex h-[100dvh] w-full flex-col items-center gap-3 overflow-x-hidden bg-plum-900",
          lato.className,
          firaSans.className,
        )}
      >
        <QueryProvider>
          {children}
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </QueryProvider>
      </body>
    </html>
  );
}
