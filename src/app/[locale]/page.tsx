import { formatDistanceToNow } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { DrawContainer } from "@/components/atoms/Draws";
import { Icon, type IconProp } from "@/components/atoms/Icon";
import { Spheres } from "@/components/atoms/Spheres";
import { Header } from "@/components/molecules/Header";
import { SocialMedia } from "@/components/molecules/SocialMedia";
import { ArticlesView } from "@/components/organisms/Articles";
import { ContactForm } from "@/components/organisms/ContactForm";
import { ReposView } from "@/components/organisms/Repos";
import { TestimonialsView } from "@/components/organisms/Testimonials";

export default async function Home() {
  const locale = await getLocale();

  const t = await getTranslations();

  return (
    <main className="container relative flex flex-col items-center bg-plum-900 font-lato text-white">
      <Spheres />
      <DrawContainer />

      <Header />

      <SessionWrapper
        className="mt-14 pt-12 min-[300px]:pt-20 md:flex-row md:pt-36 xl:pt-56"
        id="presentation"
      >
        <section className="flex flex-col gap-6 text-white md:gap-10">
          <div className="flex max-w-2xl flex-col gap-6 md:gap-10">
            <h1 className="inline-flex flex-col text-2xl lg:text-2xl">
              {t("presentation.name")}
              <strong className="inline-flex gap-1">
                Guilherme Moraes
                <span className="inline-block w-fit origin-bottom-right animate-wave select-none text-base">
                  👋
                </span>
              </strong>
            </h1>

            <h2
              id="my-title"
              className="font-fira-sans text-3xl font-bold tracking-wide text-gold-500 md:my-2 md:text-4xl lg:text-5xl lg:leading-tight"
            >
              {t("presentation.title")}
            </h2>

            <p className="leading-tight tracking-wide lg:text-2xl">
              {t("presentation.subtitle")}
            </p>
          </div>

          <SocialMedia className="hidden md:flex" />
        </section>

        <section className="flex flex-col items-center justify-center gap-6">
          <div className="relative h-[240px] w-[240px] transition-all sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80">
            <Image
              src="/profile.png"
              fill
              sizes="100%"
              className="aspect-square h-72 select-none object-cover drop-shadow-[0px_0px_4px_rgba(242,226,236,0.2)] md:h-auto"
              priority
              alt={t("presentation.profile-image-alt")}
            />
          </div>

          <SocialMedia className="flex md:hidden" />
        </section>
      </SessionWrapper>

      <SessionWrapper
        className="pt-14 min-[300px]:pt-24 md:pt-32 xl:pt-52"
        id="about-me"
      >
        <section className="flex flex-col gap-10 md:flex-row">
          <HighlightCard icon="Rocket">
            {t.rich("about-me.cards.years-experience", {
              time: formatDistanceToNow(new Date(2019, 5, 11), {
                locale: locale === "pt" ? ptBR : enUS,
              }),
              highlight: (chunks) => (
                <span className="text-xl text-plum-300">{chunks}</span>
              ),
            })}
          </HighlightCard>

          <HighlightCard icon="MagnifyingGlass">
            {t.rich("about-me.cards.attention-details", {
              highlight: (chunks) => (
                <span className="text-xl text-plum-300">{chunks}</span>
              ),
            })}
          </HighlightCard>

          <HighlightCard icon="Globe">
            {t.rich("about-me.cards.worldwide", {
              highlight: (chunks) => (
                <span className="text-xl text-plum-300">{chunks}</span>
              ),
            })}
          </HighlightCard>
        </section>
      </SessionWrapper>

      <SessionWrapper
        className="pt-14 min-[300px]:pt-24 md:pt-32 lg:items-start xl:pt-52"
        id="articles"
      >
        <SessionHeader
          title={t("articles.title")}
          quote={t("articles.quote")}
        />

        <section className="flex w-full flex-col items-center justify-center gap-6">
          <ArticlesView />
        </section>

        <section className="flex w-full flex-col items-center justify-center gap-4 md:items-end">
          <a
            href="https://dev.to/guimoraes"
            className="rounded-sm p-3 text-center text-sm font-medium leading-tight text-plum-200 hover:underline"
          >
            {t("articles.all-articles")}
          </a>
        </section>
      </SessionWrapper>

      <SessionWrapper
        className="pt-16 min-[300px]:pt-28 md:pt-36 lg:items-start xl:pt-56"
        id="references"
      >
        <SessionHeader
          title={t("references.title")}
          quote={t("references.quote")}
        />

        <section className="flex w-full flex-wrap items-start justify-start gap-14 xl:flex-nowrap">
          <TestimonialsView />
        </section>
      </SessionWrapper>

      <SessionWrapper
        className="items-start justify-start pt-16 min-[300px]:pt-28 md:pt-36 xl:pt-56"
        id="projects"
      >
        <SessionHeader
          title={t("projects.title")}
          quote={t("projects.quote")}
        />

        <section className="flex w-full flex-wrap items-center justify-center gap-14">
          <ReposView />
        </section>

        <section className="flex w-full flex-col items-center justify-center gap-4 md:items-end">
          <a
            href="https://github.com/GuiMoraesDev?tab=repositories"
            target="_blank"
            className="rounded-sm p-3 text-center text-sm font-medium leading-tight text-plum-200 hover:underline"
          >
            {t("projects.all-projects")}
          </a>
        </section>
      </SessionWrapper>

      <SessionWrapper
        className="justify-start pt-16 min-[300px]:pt-28 md:pt-36 xl:pt-56"
        id="contact"
      >
        <SessionHeader
          title={t("contact.title")}
          quote={t("contact.subtitle")}
        />

        <section className="flex h-full min-h-32 w-full flex-col items-start justify-between gap-10">
          <ContactForm />
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
        <footer className="z-10 flex h-full w-full flex-col items-center justify-between gap-4 text-sm text-white md:flex-row lg:items-end">
          <div className="flex flex-col gap-3">
            <strong
              className={twMerge(
                "mb-2 text-2xl leading-normal tracking-wide",
                "inline-block animate-gradient-x bg-gradient-to-r from-plum-200 via-plum-400 to-plum-50 bg-clip-text text-transparent",
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
      </SessionWrapper>
    </main>
  );
}

const SessionWrapper = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={twMerge(
      "relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-between gap-12 font-lato max-[2000px]:px-[10vw]",
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
    <h2 className="font-fira-sans text-xl font-bold lg:text-2xl">{title}</h2>

    <p className="leading-snug tracking-wide">{quote}</p>
  </header>
);

type HighlightCardProps = ComponentProps<"p"> & {
  icon: IconProp;
};
const HighlightCard = ({ icon, ...props }: HighlightCardProps) => (
  <div className="flex flex-col items-center justify-start gap-4 text-plum-50">
    <Icon icon={icon} size="lg" />
    <p
      className="text-center text-base leading-normal tracking-wider"
      {...props}
    />
  </div>
);
