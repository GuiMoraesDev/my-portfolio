import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { AppProvider } from "@/provider/AppProvider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const description =
  "Senior Software Engineer building reliable, maintainable frontend systems with React, Next.js and TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.guimoraes.dev"),
  referrer: "origin-when-cross-origin",
  keywords: [
    "portfolio",
    "frontend engineer",
    "TypeScript",
    "Next.js",
    "React",
    "JavaScript",
    "Node.js",
  ],
  authors: { name: "Guilherme Moraes", url: "https://github.com/GuiMoraesDev" },
  creator: "Guilherme Moraes",
  publisher: "Guilherme Moraes",
  title: "Guilherme Moraes | Software engineer",
  description,
  openGraph: {
    title: "Guilherme Moraes",
    description,
    url: "https://www.guimoraes.dev/",
    siteName: "Guilherme Moraes | Software engineer",
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

  return (
    <html
      className={`${geist.variable} ${geistMono.variable} scroll-pt-20 scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
      lang={locale}
    >
      <body className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-bg-canvas font-body text-text-primary">
        <AppProvider>
          <Header />

          <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 md:px-8">
            {children}
          </main>

          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
