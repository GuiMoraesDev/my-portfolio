import "@/styles/globals.css";

import type { Metadata } from "next";

import { Wave } from "@/components/molecules/Wave";
import { Header } from "@/components/organisms/Header";
import { AppProvider } from "@/provider/AppProvider";

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
  description:
    "I'm specialist in creating apps using Next.js, TypeScript, Node.js, automated tests, and more!",
  openGraph: {
    title: "Guilherme Moraes",
    description:
      "I'm specialist in creating apps using Next.js, TypeScript, Node.js, automated tests, and more!",
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
      className="flex scroll-pt-20 items-center justify-center scroll-smooth"
      data-scroll-behavior="smooth"
      lang={locale}
    >
      <body className="flex min-h-dvh w-full flex-col items-center gap-3 overflow-x-hidden bg-ink-900 text-text-primary max-ultra:px-[10vw]">
        <AppProvider>
          <Header />

          <main className="container flex flex-1 flex-col gap-[20vh] font-body text-text-primary">
            <Wave className="mb-auto" />

            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
