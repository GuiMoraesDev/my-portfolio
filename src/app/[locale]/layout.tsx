import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Lato, Fira_Sans } from "next/font/google";
import "@/styles/globals.css";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { LanguageSwitcher } from "@/components/atoms/LanguageSwitcher";
import { MenuWrapper } from "@/components/atoms/MenuWrapper";
import { Spheres } from "@/components/atoms/Spheres";
import { SocialMedia } from "@/components/molecules/SocialMedia";
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
  const t = await getTranslations();

  const NAV_LINKS = [{ href: "#presentation", label: t("links.home") }];

  return (
    <html
      className="scroll-pt-20 scroll-smooth"
      data-scroll-behavior="smooth"
      lang={locale}
    >
      <body
        className={twMerge(
          "container flex h-dvh w-full flex-col items-center gap-3 overflow-x-hidden bg-bg-canvas text-text-primary",
          lato.className,
          firaSans.className,
        )}
      >
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <header
              className={twMerge(
                "sticky top-0 z-20 flex h-20 w-full max-w-480 shrink-0 flex-col items-center justify-between gap-16 font-body max-[2000px]:px-[10vw]",
                "before:absolute before:bottom-0 before:left-1/2 before:h-full before:w-screen before:-translate-x-1/2 before:bg-plum-900 before:opacity-95 before:content-['']",
              )}
            >
              <nav className="relative flex h-full w-full items-center justify-between">
                <MenuWrapper>
                  <ul className="relative flex flex-col gap-8 md:flex-row md:items-center">
                    {NAV_LINKS.map(({ href, label }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="text-sm font-medium tracking-widest text-text-secondary uppercase transition hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <section className="relative flex flex-col gap-4 md:flex-row md:items-center">
                    <Link
                      href="#footer"
                      className="w-fit rounded-sm border border-accent-400 px-4 py-1.5 text-sm font-semibold tracking-widest text-accent-400 uppercase transition hover:bg-accent-400 hover:text-plum-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                    >
                      {t("links.get-in-touch")}
                    </Link>

                    <LanguageSwitcher />
                  </section>
                </MenuWrapper>
              </nav>
            </header>

            <main className="relative flex flex-col items-center gap-12 bg-bg-canvas font-body text-text-primary">
              <Spheres />

              <TerminalContact />

              {children}
            </main>

            <footer
              className={twMerge(
                "relative z-10 flex h-full w-full max-w-480 flex-col items-center justify-between gap-4 gap-16 py-10 font-body text-sm text-white max-[2000px]:px-[10vw] md:flex-row lg:items-end",
                "before:absolute before:bottom-0 before:left-1/2 before:h-full before:w-screen before:-translate-x-1/2 before:bg-black/90 before:opacity-95 before:content-['']",
              )}
              id="footer"
            >
              <footer className="z-10 flex h-full w-full flex-col items-center justify-between gap-4 text-sm text-text-secondary md:flex-row lg:items-end">
                <div className="flex flex-col gap-3">
                  <strong
                    className={twMerge(
                      "mb-2 text-2xl leading-normal tracking-wide",
                      "animate-gradient-x via-plum-400 inline-block bg-linear-to-r from-plum-200 to-plum-50 bg-clip-text text-transparent",
                    )}
                  >
                    {t("footer.title")}
                  </strong>

                  <p className="inline-block leading-normal tracking-wide">
                    {t("footer.contact-me-by")}
                    <a
                      href="mailto:guimoraes.dev@gmail.com"
                      className="ml-1 underline"
                    >
                      guimoraes.dev@gmail.com
                    </a>
                  </p>

                  <span className="inline-block leading-relaxed tracking-wider">
                    <span className="mr-1 uppercase">
                      {t("footer.made-with-love")}
                    </span>{" "}
                    © 2024 Guilherme Moraes
                  </span>
                </div>

                <SocialMedia />
              </footer>
            </footer>
            <Analytics />
            <SpeedInsights />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
