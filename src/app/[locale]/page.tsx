import { Icon } from "@/components/atoms/Icon";
import { Header } from "@/components/molecules/Header";
import { Spheres } from "@/components/atoms/Spheres";
import { PinnedRepos } from "@/components/organisms/PinnedRepos";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { DrawContainer } from "@/components/atoms/Draws";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  const articles = [
    {
      id: 431466,
      title: "How have I designed my portifolio",
      reading_time_minutes: 7,
      positive_reactions_count: 32,
      comments_count: 8,
    },
    {
      id: 431465,
      title: "How to create a CSS tail whip animation",
      reading_time_minutes: 7,
      positive_reactions_count: 32,
      comments_count: 8,
    },
    {
      id: 431446,
      title: "Adding multiple languages in a NextJS 14 app",
      reading_time_minutes: 7,
      positive_reactions_count: 32,
      comments_count: 8,
    },
  ];
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "CTO",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut bibendum diam. Nullam rutrum ac leo id commodo. Vestibulum quis est et ante lobortis congue viverra sed turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris tincidunt et velit at molestie.",
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "CEO",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut bibendum diam. Nullam rutrum ac leo id commodo. Vestibulum quis est et ante lobortis congue viverra sed turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris tincidunt et velit at molestie.",
    },
    {
      id: 3,
      name: "John Doe",
      role: "CTO",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut bibendum diam. Nullam rutrum ac leo id commodo. Vestibulum quis est et ante lobortis congue viverra sed turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris tincidunt et velit at molestie.",
    },
  ];

  return (
    <main className="container relative flex flex-col items-center bg-plum-900 pb-14 text-white lg:pb-36">
      <Spheres />
      <DrawContainer />

      <Header className="max-w-7xl max-[2000px]:px-[10vw]" />

      <SessionWrapper className="md:flex-row">
        <section className="flex flex-col gap-4 text-white">
          <div className="flex max-w-2xl flex-col gap-4">
            <h1 className="inline-flex flex-col text-2xl lg:text-2xl">
              {t("presentation.name")}
              <strong className="inline-flex gap-1">
                Guilherme Moraes
                <span className="inline-block w-fit origin-bottom-right animate-wave select-none text-base">
                  👋
                </span>
              </strong>
            </h1>

            <h2 className="text-4xl font-bold text-gold-500 lg:text-6xl xl:text-7xl">
              {t("presentation.title")}
            </h2>

            <p className="leading-normal lg:text-2xl">
              {t("presentation.subtitle")}
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

      <SessionWrapper className="lg:flex-row">
        <section className="flex flex-col gap-10 lg:w-1/2">
          <SessionHeader
            title={t("overview.title")}
            quote={t("overview.quote")}
          />

          <p>{t("overview.description")}</p>
        </section>

        <section className="grid grid-cols-1 items-center justify-center gap-4 min-[340px]:grid-cols-2">
          <div className="flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-md bg-plum-500 lg:h-36 lg:w-44 xl:h-40 xl:w-52 xl:gap-4">
            <Icon icon="Chip" />
            <p className="w-4/5 text-center text-xs text-white lg:text-base xl:text-lg">
              {t("overview.cards.years-experience")}
            </p>
          </div>

          <div className="flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-md bg-plum-500 lg:h-36 lg:w-44 xl:h-40 xl:w-52 xl:gap-4">
            <Icon icon="MagnifyingGlass" />
            <p className="w-4/5 text-center text-xs text-white lg:text-base xl:text-lg">
              {t("overview.cards.attention-details")}
            </p>
          </div>

          <div className="flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-md bg-plum-500 lg:h-36 lg:w-44 xl:h-40 xl:w-52 xl:gap-4">
            <Icon icon="Code" />
            <p className="w-4/5 text-center text-xs text-white lg:text-base xl:text-lg">
              {t("overview.cards.scalable-code")}
            </p>
          </div>

          <div className="flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-md bg-plum-500 lg:h-36 lg:w-44 xl:h-40 xl:w-52 xl:gap-4">
            <Icon icon="Globe" />
            <p className="w-4/5 text-center text-xs text-white lg:text-base xl:text-lg">
              {t("overview.cards.remote-work")}
            </p>
          </div>
        </section>
      </SessionWrapper>

      <SessionWrapper className="pt-20 lg:items-start">
        <SessionHeader
          title={t("know-how.title")}
          quote={t("know-how.quote")}
        />

        <section className="flex w-full flex-col items-center justify-center gap-6">
          {articles.map(
            ({
              id,
              title,
              reading_time_minutes,
              positive_reactions_count,
              comments_count,
            }) => (
              <div
                key={id}
                className="flex h-24 w-full flex-col items-start justify-center gap-4 rounded-md bg-plum-500 px-3 md:h-14 md:flex-row md:items-center md:justify-between xl:gap-5"
              >
                <header className="flex items-start justify-start gap-2">
                  <Icon icon="Article" size="sm" />
                  <p className="text-xs text-white min-[340px]:text-sm xl:text-lg">
                    {title}
                  </p>
                </header>

                <div className="flex items-center justify-start gap-9 md:gap-5">
                  <span className="inline-flex items-center justify-center gap-1.5 text-xs text-white">
                    <Icon icon="Clock" size="sm" />
                    {reading_time_minutes} min
                  </span>
                  <span className="inline-flex items-center justify-center gap-1.5 text-xs text-white">
                    <Icon icon="ThumbsUp" size="sm" />
                    {positive_reactions_count}
                  </span>
                  <span className="inline-flex items-center justify-center gap-1.5 text-xs text-white">
                    <Icon icon="Comments" size="sm" />
                    {comments_count}
                  </span>
                </div>
              </div>
            ),
          )}
        </section>
      </SessionWrapper>

      <SessionWrapper className="lg:items-start">
        <SessionHeader
          title={t("about-me.title")}
          quote={t("about-me.quote")}
        />

        <section className="flex w-full flex-wrap items-center justify-center gap-14 xl:flex-nowrap">
          {testimonials.map(({ id, name, role, content }) => (
            <div
              key={id}
              className="flex w-full max-w-xs flex-col items-center justify-center rounded-md border-8 border-plum-500 bg-plum-50 px-3 md:max-w-[45%] md:justify-between lg:max-w-xs"
            >
              <Image
                src="/testimonial-placeholder.png"
                width={75}
                height={75}
                className="aspect-square h-auto -translate-y-1/3 select-none object-contain"
                priority
                alt=""
              />

              <div className="flex w-full flex-col items-center justify-start gap-4 pb-6 md:gap-5">
                <p className="w-full text-sm leading-tight text-gray-800">
                  {content}
                </p>

                <strong className="text-lg font-medium leading-tight text-gray-900">
                  {name}
                </strong>
                <p className="text-sm font-bold leading-tight text-gray-950">
                  {role}
                </p>
              </div>
            </div>
          ))}
        </section>
      </SessionWrapper>

      <SessionWrapper className="items-start justify-start">
        <SessionHeader title={t("code.title")} quote={t("code.quote")} />

        <section className="flex w-full flex-wrap items-center justify-center gap-14">
          <PinnedRepos />
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
