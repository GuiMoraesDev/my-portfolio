import { formatDistanceToNow } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { pick } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { DrawContainer } from "@/components/atoms/Draws";
import { Icon, type IconProp } from "@/components/atoms/Icon";
import { Spheres } from "@/components/atoms/Spheres";
import { Header } from "@/components/molecules/Header";
import { Articles } from "@/components/organisms/Articles";
import { ContactForm } from "@/components/organisms/ContactForm";
import { PinnedRepos } from "@/components/organisms/PinnedRepos";
import { Testimonials } from "@/components/organisms/Testimonials";
import { capitalizeFirstLetter } from "@/util/capitalizeFirstLetter";

export default function Home() {
  const locale = useLocale();

  const messages = useMessages();

  const presentationT = useTranslations("presentation");
  const overviewT = useTranslations("overview");
  const knowHowT = useTranslations("know-how");
  const buzzAboutMeT = useTranslations("buzz-about-me");
  const codeT = useTranslations("code");
  const contactT = useTranslations("contact");

  return (
    <main className="container relative flex flex-col items-center bg-plum-900 font-lato text-white">
      <Spheres />
      <DrawContainer />

      <NextIntlClientProvider messages={pick(messages, "links")}>
        <Header className="max-w-7xl max-[2000px]:px-[10vw]" />
      </NextIntlClientProvider>

      <SessionWrapper className="mt-14 md:flex-row" id="home">
        <section className="flex flex-col gap-4 text-white">
          <div className="flex max-w-2xl flex-col gap-6 md:gap-8">
            <h1 className="inline-flex flex-col text-2xl lg:text-2xl">
              {presentationT("name")}
              <strong className="inline-flex gap-1">
                Guilherme Moraes
                <span className="inline-block w-fit origin-bottom-right animate-wave select-none text-base">
                  👋
                </span>
              </strong>
            </h1>

            <h2 className="font-fira-sans text-3xl font-bold text-gold-500 md:my-2 md:text-5xl lg:text-6xl lg:leading-tight xl:text-7xl xl:leading-tight">
              {presentationT("title")}
            </h2>

            <p className="tracking-wide lg:text-2xl">
              {presentationT("subtitle")}
            </p>
          </div>

          <SocialMedia className="hidden md:flex" />
        </section>

        <section className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/profile.png"
            width={400}
            height={400}
            className="aspect-square h-72 select-none object-contain md:h-auto"
            priority
            alt=""
          />

          <SocialMedia className="flex md:hidden" />
        </section>
      </SessionWrapper>

      <SessionWrapper className="lg:flex-row" id="overview">
        <section className="flex flex-col gap-10 lg:w-1/2">
          <SessionHeader
            title={overviewT("title")}
            quote={overviewT("quote")}
          />

          <p className="text-lg leading-snug tracking-wide">
            {overviewT("description")}
          </p>
        </section>

        <section className="grid grid-cols-1 items-center justify-center gap-4 min-[340px]:grid-cols-2">
          <OverviewCard icon="Chip">
            {overviewT("cards.years-experience", {
              time: capitalizeFirstLetter(
                formatDistanceToNow(new Date(2019, 5, 11), {
                  locale: locale === "pt" ? ptBR : enUS,
                }),
              ),
            })}
          </OverviewCard>

          <OverviewCard icon="MagnifyingGlass">
            {overviewT("cards.attention-details")}
          </OverviewCard>

          <OverviewCard icon="Code">
            {overviewT("cards.scalable-code")}
          </OverviewCard>

          <OverviewCard icon="Globe">
            {overviewT("cards.remote-work")}
          </OverviewCard>
        </section>
      </SessionWrapper>

      <SessionWrapper className="pt-20 lg:items-start" id="know-how">
        <SessionHeader title={knowHowT("title")} quote={knowHowT("quote")} />

        <section className="flex w-full flex-col items-center justify-center gap-6">
          <Articles />
        </section>
      </SessionWrapper>

      <SessionWrapper className="lg:items-start" id="about-me">
        <SessionHeader
          title={buzzAboutMeT("title")}
          quote={buzzAboutMeT("quote")}
        />

        <section className="flex w-full flex-wrap items-start justify-start gap-14 xl:flex-nowrap">
          <Testimonials />
        </section>
      </SessionWrapper>

      <SessionWrapper className="items-start justify-start" id="code">
        <SessionHeader title={codeT("title")} quote={codeT("quote")} />

        <section className="flex w-full flex-wrap items-center justify-center gap-14">
          <PinnedRepos />
        </section>
      </SessionWrapper>

      <SessionWrapper className="justify-start" id="contact">
        <SessionHeader title={contactT("title")} quote={contactT("subtitle")} />

        <section className="flex h-full min-h-32 w-full flex-col items-start justify-between gap-10 rounded-md bg-plum-500/90 p-4 md:p-8">
          <NextIntlClientProvider messages={pick(messages, "contact")}>
            <ContactForm />
          </NextIntlClientProvider>
        </section>
      </SessionWrapper>

      <SessionWrapper
        className={twMerge(
          "mt-8 min-[300px]:mt-16 md:mt-28 xl:mt-44",
          "py-4 min-[300px]:py-8 md:py-14 xl:py-24",
          "before:absolute before:bottom-0 before:left-1/2 before:h-full before:w-[100vw] before:-translate-x-1/2 before:bg-black/90 before:opacity-95 before:content-['']",
        )}
      >
        <footer className="z-10 flex h-full w-full items-end justify-between gap-4 text-sm text-white">
          <div className="flex flex-col gap-3">
            <strong
              className={twMerge(
                "mb-2 text-2xl leading-normal tracking-wide",
                "animate-gradient-x inline-block bg-gradient-to-r from-plum-200 via-plum-400 to-plum-50 bg-clip-text text-transparent",
              )}
            >
              Nice to have you here!
            </strong>
            <p className="inline-flex gap-1 leading-normal tracking-wide">
              Contact me directly:
              <a href="mailto:guimoraes.dev@gmail.com" className="underline">
                guimoraes.dev@gmail.com
              </a>
            </p>

            <span className="inline-flex gap-1 leading-relaxed tracking-wider">
              <span className="uppercase">Made with love</span> © 2023
              Guilherme Moraes
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
      "relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-between gap-12 max-[2000px]:px-[10vw]",
      "pt-8 min-[300px]:pt-16 md:pt-28 xl:pt-44",
      className,
    )}
    {...props}
  />
);

const SocialMedia = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={twMerge("flex items-center gap-10", className)} {...props}>
    <Link
      href="https://github.com/GuiMoraesDev"
      className="flex cursor-pointer flex-col items-center justify-center gap-2 p-4"
    >
      <Icon icon="Github" size="md" />
      <span className="text-sm tracking-wider text-white">GitHub</span>
    </Link>

    <Link
      href="https://www.linkedin.com/in/guimoraesdev"
      className="flex cursor-pointer flex-col items-center justify-center gap-2 p-4"
    >
      <Icon icon="LinkedIn" size="md" />
      <span className="text-sm tracking-wider text-white">LinkedIn</span>
    </Link>
  </div>
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

type OverviewCardProps = ComponentProps<"p"> & {
  icon: IconProp;
};

const OverviewCard = ({ icon, ...props }: OverviewCardProps) => (
  <div className="flex h-28 w-40 flex-col items-center justify-center gap-2 rounded-md bg-plum-500/90 shadow-sm transition hover:shadow-plum-100/80 min-[340px]:w-36 md:h-36 md:w-44 xl:h-40 xl:w-52 xl:gap-4">
    <Icon icon={icon} />
    <p
      className="w-4/5 text-center font-fira-sans text-xs text-white md:text-base xl:text-lg"
      {...props}
    />
  </div>
);
