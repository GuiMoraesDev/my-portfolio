import { formatDistanceToNow } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { pick } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { DrawContainer } from "@/components/atoms/Draws";
import { Icon } from "@/components/atoms/Icon";
import { Spheres } from "@/components/atoms/Spheres";
import { Header } from "@/components/molecules/Header";
import { Articles } from "@/components/organisms/Articles";
import { ContactForm } from "@/components/organisms/ContactForm";
import { PinnedRepos } from "@/components/organisms/PinnedRepos";
import { Testimonials } from "@/components/organisms/Testimonials";

export default function Home() {
  const locale = useLocale();

  const messages = useMessages();

  const presentationT = useTranslations("presentation");
  const overviewT = useTranslations("overview");
  const knowHowT = useTranslations("know-how");
  const buzzAboutMeT = useTranslations("buzz-about-me");
  const codeT = useTranslations("code");

  return (
    <main className="container relative flex flex-col items-center bg-plum-900 pb-14 text-white lg:pb-36">
      <Spheres />
      <DrawContainer />

      <Header className="max-w-7xl max-[2000px]:px-[10vw]" />

      <SessionWrapper className="mt-14 md:flex-row" id="home">
        <section className="flex flex-col gap-4 text-white">
          <div className="flex max-w-2xl flex-col gap-4">
            <h1 className="inline-flex flex-col text-2xl lg:text-2xl">
              {presentationT("name")}
              <strong className="inline-flex gap-1">
                Guilherme Moraes
                <span className="inline-block w-fit origin-bottom-right animate-wave select-none text-base">
                  👋
                </span>
              </strong>
            </h1>

            <h2 className="text-3xl font-bold text-gold-500 sm:text-4xl lg:text-6xl xl:text-7xl">
              {presentationT("title")}
            </h2>

            <p className="leading-normal lg:text-2xl">
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

          <p>{overviewT("description")}</p>
        </section>

        <section className="grid grid-cols-1 items-center justify-center gap-4 min-[340px]:grid-cols-2">
          <div className="flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-md bg-plum-500 lg:h-36 lg:w-44 xl:h-40 xl:w-52 xl:gap-4">
            <Icon icon="Chip" />
            <p className="w-4/5 text-center text-xs text-white lg:text-base xl:text-lg">
              {overviewT("cards.years-experience", {
                time: formatDistanceToNow(new Date(2019, 5, 11), {
                  locale: locale === "pt" ? ptBR : enUS,
                }),
              })}
            </p>
          </div>

          <div className="flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-md bg-plum-500 lg:h-36 lg:w-44 xl:h-40 xl:w-52 xl:gap-4">
            <Icon icon="MagnifyingGlass" />
            <p className="w-4/5 text-center text-xs text-white lg:text-base xl:text-lg">
              {overviewT("cards.attention-details")}
            </p>
          </div>

          <div className="flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-md bg-plum-500 lg:h-36 lg:w-44 xl:h-40 xl:w-52 xl:gap-4">
            <Icon icon="Code" />
            <p className="w-4/5 text-center text-xs text-white lg:text-base xl:text-lg">
              {overviewT("cards.scalable-code")}
            </p>
          </div>

          <div className="flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-md bg-plum-500 lg:h-36 lg:w-44 xl:h-40 xl:w-52 xl:gap-4">
            <Icon icon="Globe" />
            <p className="w-4/5 text-center text-xs text-white lg:text-base xl:text-lg">
              {overviewT("cards.remote-work")}
            </p>
          </div>
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

      <SessionWrapper className="justify-start" id="code">
        <section className="flex h-full min-h-32 w-2/3 flex-col items-start justify-between gap-10 rounded-md bg-plum-500 px-8 py-6 md:py-4">
          <SessionHeader
            title="Let's talk!"
            quote="Hey there! Got something on your mind? Shoot me a message—I'm all ears and ready for a good chat."
            className="md:max-w-[50%]"
          />

          <NextIntlClientProvider messages={pick(messages, "contact")}>
            <ContactForm />
          </NextIntlClientProvider>
        </section>
      </SessionWrapper>
    </main>
  );
}

const SessionWrapper = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={twMerge(
      "relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-between gap-10 max-[2000px]:px-[10vw]",
      "pt-14 xl:pt-36",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

const SocialMedia = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={twMerge("items-center gap-10", className)} {...props}>
    <Link
      href="https://github.com/GuiMoraesDev"
      className="flex cursor-pointer flex-col items-center justify-center gap-2 p-4"
    >
      <Icon icon="Github" size="lg" />
      <span className="text-sm tracking-wider text-white">GitHub</span>
    </Link>

    <Link
      href="https://www.linkedin.com/in/guimoraesdev"
      className="flex cursor-pointer flex-col items-center justify-center gap-2 p-4"
    >
      <Icon icon="LinkedIn" size="lg" />
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
    className={twMerge("flex w-full flex-col gap-6", className)}
    {...props}
  >
    <h2 className="text-xl font-bold lg:text-2xl">{title}</h2>

    <p className="text-sm leading-normal">{quote}</p>
  </header>
);
