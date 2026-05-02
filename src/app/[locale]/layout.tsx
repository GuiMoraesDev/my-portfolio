import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher";
import { MenuWrapper } from "@/components/molecules/MenuWrapper";
import { SocialMedia } from "@/components/molecules/SocialMedia";
import { Spheres } from "@/components/molecules/Spheres";
import { TerminalContact } from "@/components/organisms/TerminalContact";
import { QueryProvider } from "@/provider/QueryProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.guimoraes.dev"),
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
      className="flex scroll-pt-20 items-center justify-center scroll-smooth"
      data-scroll-behavior="smooth"
      lang={locale}
    >
      <body className="container flex h-dvh w-full flex-col items-center gap-3 overflow-x-hidden bg-[#12131A] text-text-primary">
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <header
              id="header"
              className={twMerge(
                "sticky top-0 z-20 flex h-20 w-full max-w-480 shrink-0 flex-col items-center justify-between gap-16 font-body max-[2000px]:px-[10vw]",
                "before: before:absolute before:bottom-0 before:left-1/2 before:h-full before:w-screen before:-translate-x-1/2 before:bg-linear-to-br before:from-plum-900 before:to-plum-700 before:opacity-95 before:content-['']",
              )}
            >
              <nav className="relative flex h-full w-full items-center justify-between">
                <MenuWrapper>
                  <ul className="relative flex flex-col gap-8 md:flex-row md:items-center">
                    {NAV_LINKS.map(({ href, label }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="text-sm font-medium tracking-widest text-text-secondary uppercase transition hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-300"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <section className="relative flex flex-col gap-4 md:flex-row md:items-center">
                    <LanguageSwitcher />
                  </section>
                </MenuWrapper>
              </nav>
            </header>

            <main className="relative flex flex-col items-center gap-12 font-body text-text-primary">
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
                      "inline-block animate-gradient-x bg-linear-to-r from-plum-200 via-plum-400 to-plum-50 bg-clip-text text-transparent",
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
