import "@/styles/globals.css";

import type { Metadata } from "next";
import { Michroma, Space_Grotesk } from "next/font/google";

import { Wave } from "@/components/molecules/Wave";
import { Header } from "@/components/organisms/Header";
import { AppProvider } from "@/provider/AppProvider";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

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
      className={`${michroma.variable} ${spaceGrotesk.variable} flex scroll-pt-20 items-center justify-center scroll-smooth`}
      data-scroll-behavior="smooth"
      lang={locale}
    >
      <body className="flex min-h-dvh w-full flex-col items-center gap-3 overflow-x-hidden bg-ink-900 text-text-primary">
        <AppProvider>
          <main className="container flex flex-1 flex-col font-body text-text-primary max-ultra:px-[10vw]">
            <Header />

            <div className="flex flex-1 flex-col gap-[16vh]">
              <Wave className="mb-auto" />

              {children}
            </div>
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
