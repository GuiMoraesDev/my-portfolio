import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { BentoCell } from "@/components/atoms/BentoCell";
import { LanguageSwitcher } from "@/components/atoms/LanguageSwitcher";
import { MenuWrapper } from "@/components/atoms/MenuWrapper";
import { SocialMedia } from "@/components/molecules/SocialMedia";
import { ArticlesView } from "@/components/organisms/Articles";

export default async function Home() {
  const t = await getTranslations();

  const NAV_LINKS = [
    { href: "#presentation", label: t("links.home") },
    { href: "/blog", label: t("links.blog") },
  ];

  return (
    <>
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
                  <a
                    href={href}
                    className="text-sm font-medium tracking-widest text-text-secondary uppercase transition hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                  >
                    {label}
                  </a>
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

      <SessionWrapper id="presentation">
        <section className="flex w-full flex-col gap-8 text-text-primary md:gap-12">
          <header className="flex flex-col gap-3 md:gap-4">
            <p className="motion-enter text-sm font-medium tracking-widest uppercase">
              {t("presentation.name")}
            </p>

            <h1 className="motion-enter motion-enter-delay-1 font-title text-display leading-tight font-bold tracking-tight text-accent-500">
              Guilherme Moraes
            </h1>

            <h2
              id="my-title"
              className="motion-enter motion-enter-delay-2 font-title text-headline tracking-tight text-text-secondary"
            >
              {t("presentation.title")}
            </h2>
          </header>

          <p className="motion-enter motion-enter-delay-2 text-body-lg leading-relaxed tracking-wide text-text-secondary md:max-w-[65%]">
            {t("presentation.subtitle")}
          </p>

          <SocialMedia className="justify-start" />
        </section>
      </SessionWrapper>

      <SessionWrapper id="about-me">
        <div className="grid w-full grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-3">
          <BentoCell.Wrapper className="motion-enter bg-bg-elevated/70 lg:col-span-2">
            <BentoCell.Label>{t("how-i-work.think.label")}</BentoCell.Label>
            <BentoCell.Heading>
              {t("how-i-work.think.heading")}
            </BentoCell.Heading>
            <BentoCell.Body>{t("how-i-work.think.body")}</BentoCell.Body>
          </BentoCell.Wrapper>

          <BentoCell.Wrapper className="motion-enter motion-enter-delay-1 bg-plum-700/60">
            <BentoCell.Label>{t("how-i-work.decide.label")}</BentoCell.Label>
            <BentoCell.Heading>
              {t("how-i-work.decide.heading")}
            </BentoCell.Heading>
            <BentoCell.Body>{t("how-i-work.decide.body")}</BentoCell.Body>
          </BentoCell.Wrapper>

          <BentoCell.Wrapper className="motion-enter motion-enter-delay-2 bg-plum-500/40">
            <BentoCell.Label>{t("how-i-work.ship.label")}</BentoCell.Label>
            <BentoCell.Heading>
              {t("how-i-work.ship.heading")}
            </BentoCell.Heading>
            <BentoCell.Body>{t("how-i-work.ship.body")}</BentoCell.Body>
          </BentoCell.Wrapper>

          <BentoCell.Wrapper className="motion-enter motion-enter-delay-1 bg-bg-elevated/40 md:col-span-2 lg:col-span-2">
            <BentoCell.Label>
              {t("how-i-work.collaborate.label")}
            </BentoCell.Label>
            <BentoCell.Heading>
              {t("how-i-work.collaborate.heading")}
            </BentoCell.Heading>
            <BentoCell.Body>{t("how-i-work.collaborate.body")}</BentoCell.Body>
          </BentoCell.Wrapper>
        </div>
      </SessionWrapper>

      <SessionWrapper id="articles">
        <header className="flex w-full flex-col gap-2">
          <h2 className="font-title text-headline font-bold tracking-tight">
            {t("articles.title")}
          </h2>

          <p className="text-base leading-snug tracking-wide text-text-muted">
            {t("articles.quote")}
          </p>
        </header>

        <section className="flex w-full flex-col items-center justify-center gap-6">
          <ArticlesView />
        </section>

        <footer className="flex w-full flex-col items-center justify-center gap-4 md:items-end">
          <Link
            href="/blog"
            className="rounded-sm p-3 text-center text-sm leading-tight font-medium text-text-secondary hover:text-text-primary hover:underline"
          >
            {t("articles.all-articles")}
          </Link>
        </footer>
      </SessionWrapper>

      <SessionWrapper
        className={twMerge(
          "before:absolute before:bottom-0 before:left-1/2 before:h-full before:w-screen before:-translate-x-1/2 before:bg-black/90 before:opacity-95 before:content-['']",
        )}
        id="footer"
      >
        <footer className="z-10 flex h-full w-full flex-col items-center justify-between gap-4 text-sm text-text-secondary md:flex-row lg:items-end">
          <div className="flex flex-col gap-3">
            <strong className="mb-2 inline-block text-headline leading-normal tracking-tight text-text-primary">
              {t("footer.title")}
            </strong>

            <span className="inline-block leading-relaxed tracking-wider">
              <span className="mr-1 uppercase">
                {t("footer.made-with-love")}
              </span>{" "}
              © 2024 Guilherme Moraes
            </span>
          </div>

          <SocialMedia />
        </footer>
      </SessionWrapper>
    </>
  );
}

const SessionWrapper = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={twMerge(
      "relative z-10 flex h-full w-full max-w-480 flex-col items-center justify-between gap-16 py-10 font-body max-[2000px]:px-[10vw]",
      className,
    )}
    {...props}
  />
);
