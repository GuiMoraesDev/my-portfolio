import { getLocale, getTranslations } from "next-intl/server";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { DrawContainer } from "@/components/atoms/Draws";
import { Icon, type IconProp } from "@/components/atoms/Icon";
import { Spheres } from "@/components/atoms/Spheres";
import { Header } from "@/components/molecules/Header";
import { SocialMedia } from "@/components/molecules/SocialMedia";
import { ArticlesView } from "@/components/organisms/Articles";
import { TerminalContact } from "@/components/organisms/TerminalContact";
import { TestimonialsView } from "@/components/organisms/Testimonials";

const yearsOfExperience = Math.floor(
  (Date.now() - new Date(2019, 5, 11).getTime()) /
    (1000 * 60 * 60 * 24 * 365.25),
);

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations();
  const formattedYears = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "year",
    unitDisplay: "long",
  }).format(yearsOfExperience);

  return (
    <main className="relative container flex flex-col items-center bg-[color:var(--color-bg-canvas)] font-body text-[color:var(--color-text-primary)]">
      <Spheres />
      <DrawContainer />

      <Header />
      <TerminalContact />

      <SessionWrapper
        className="mt-14 items-start pt-12 min-[300px]:pt-20 md:pt-36 xl:pt-56"
        id="presentation"
      >
        <section className="flex w-full flex-col gap-8 text-[color:var(--color-text-primary)] md:gap-12">
          <h1 className="motion-enter inline-flex flex-col text-[var(--text-headline)]">
            {t("presentation.name")}
            <strong className="inline-flex gap-1">
              Guilherme Moraes
              <span className="inline-block w-fit origin-bottom-right animate-wave text-base select-none">
                👋
              </span>
            </strong>
          </h1>

          <h2
            id="my-title"
            className="motion-enter motion-enter-delay-1 max-w-[20ch] font-title font-bold tracking-tight text-[color:var(--color-accent-400)] text-[var(--text-display)] lg:leading-tight"
          >
            {t("presentation.title")}
          </h2>

          <p className="motion-enter motion-enter-delay-2 max-w-[56ch] leading-relaxed tracking-wide text-[color:var(--color-text-secondary)] text-[var(--text-body-lg)]">
            {t("presentation.subtitle")}
          </p>

          <SocialMedia className="justify-start" />
        </section>
      </SessionWrapper>

      <SessionWrapper
        className="pt-14 min-[300px]:pt-24 md:pt-32 xl:pt-52"
        id="about-me"
      >
        <section className="grid w-full grid-cols-1 gap-14 lg:grid-cols-3 lg:gap-10">
          <NarrativeBlock icon="Rocket">
            {t.rich("about-me.cards.years-experience", {
              time: formattedYears,
              highlight: (chunks) => (
                <span className="text-[color:var(--color-accent-400)]">
                  {chunks}
                </span>
              ),
            })}
          </NarrativeBlock>

          <NarrativeBlock icon="MagnifyingGlass">
            {t.rich("about-me.cards.attention-details", {
              highlight: (chunks) => (
                <span className="text-[color:var(--color-accent-400)]">
                  {chunks}
                </span>
              ),
            })}
          </NarrativeBlock>

          <NarrativeBlock icon="Globe">
            {t.rich("about-me.cards.worldwide", {
              highlight: (chunks) => (
                <span className="text-[color:var(--color-accent-400)]">
                  {chunks}
                </span>
              ),
            })}
          </NarrativeBlock>
        </section>
      </SessionWrapper>

      <SessionWrapper
        className="pt-16 min-[300px]:pt-28 md:pt-36 lg:items-start xl:pt-56"
        id="articles"
      >
        <SessionHeader
          title={t("articles.title")}
          quote={t("articles.quote")}
          className="max-w-3xl"
        />

        <section className="flex w-full flex-col items-center justify-center gap-6">
          <ArticlesView />
        </section>

        <section className="flex w-full flex-col items-center justify-center gap-4 md:items-end">
          <a
            href="https://dev.to/guimoraes"
            className="rounded-sm p-3 text-center leading-tight font-medium text-[color:var(--color-text-secondary)] text-[var(--text-caption)] hover:text-[color:var(--color-text-primary)] hover:underline"
          >
            {t("articles.all-articles")}
          </a>
        </section>
      </SessionWrapper>

      <SessionWrapper
        className="pt-20 min-[300px]:pt-32 md:pt-40 lg:items-start xl:pt-60"
        id="references"
      >
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
          "mt-8 min-[300px]:mt-16 md:mt-28 xl:mt-44",
          "py-4 min-[300px]:py-8 md:py-14 xl:py-24",
          "before:absolute before:bottom-0 before:left-1/2 before:h-full before:w-[100vw] before:-translate-x-1/2 before:bg-black/90 before:opacity-95 before:content-['']",
        )}
        id="footer"
      >
        <footer className="z-10 flex h-full w-full flex-col items-center justify-between gap-4 text-[color:var(--color-text-secondary)] text-[var(--text-caption)] md:flex-row lg:items-end">
          <div className="flex flex-col gap-3">
            <strong className="mb-2 inline-block leading-normal tracking-tight text-[color:var(--color-text-primary)] text-[var(--text-headline)]">
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
      "relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-between gap-16 font-body max-[2000px]:px-[10vw]",
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
    <h2 className="font-title font-bold tracking-tight text-[var(--text-headline)]">
      {title}
    </h2>

    {quote ? (
      <p className="leading-snug tracking-wide text-[color:var(--color-text-muted)] text-[var(--text-body)]">
        {quote}
      </p>
    ) : null}
  </header>
);

type NarrativeBlockProps = ComponentProps<"p"> & {
  icon: IconProp;
};
const NarrativeBlock = ({ icon, ...props }: NarrativeBlockProps) => (
  <div className="flex flex-col gap-4 text-[color:var(--color-text-secondary)]">
    <Icon icon={icon} size="sm" />
    <p
      className="leading-relaxed tracking-wide text-[var(--text-body)]"
      {...props}
    />
  </div>
);
