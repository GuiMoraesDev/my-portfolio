import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { Spheres } from "@/components/atoms/Spheres";
import { Header } from "@/components/molecules/Header";
import { SocialMedia } from "@/components/molecules/SocialMedia";
import { ArticlesView } from "@/components/organisms/Articles";
import { HowIWorkView } from "@/components/organisms/HowIWork";
import { TerminalContact } from "@/components/organisms/TerminalContact";
import { TestimonialsView } from "@/components/organisms/Testimonials";

export default async function Home() {
  const t = await getTranslations();

  return (
    <main className="relative container flex flex-col items-center gap-12 bg-bg-canvas font-body text-text-primary">
      <Spheres />

      <Header />
      <TerminalContact />

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
        <HowIWorkView />
      </SessionWrapper>

      <SessionWrapper id="articles">
        <SessionHeader
          title={t("articles.title")}
          quote={t("articles.quote")}
          className="max-w-3xl"
        />

        <section className="flex w-full flex-col items-center justify-center gap-6">
          <ArticlesView />
        </section>

        <section className="flex w-full flex-col items-center justify-center gap-4 md:items-end">
          <Link
            href="/blog"
            className="rounded-sm p-3 text-center text-sm leading-tight font-medium text-text-secondary hover:text-text-primary hover:underline"
          >
            {t("articles.all-articles")}
          </Link>
        </section>
      </SessionWrapper>

      <SessionWrapper id="references">
        <SessionHeader
          title={t("references.title")}
          quote={t("references.quote")}
          className="max-w-3xl"
        />

        <section className="flex w-full flex-wrap items-start justify-start gap-14 xl:flex-nowrap">
          <TestimonialsView />
        </section>
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
    </main>
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

type SessionHeaderProps = ComponentProps<"h2"> & {
  title: string;
  quote: string;
};
const SessionHeader = ({
  title,
  quote,
  className,
  ...props
}: SessionHeaderProps) => (
  <header
    className={twMerge("flex w-full flex-col gap-2", className)}
    {...props}
  >
    <h2 className="font-title text-headline font-bold tracking-tight">
      {title}
    </h2>

    {quote ? (
      <p className="text-base leading-snug tracking-wide text-text-muted">
        {quote}
      </p>
    ) : null}
  </header>
);
