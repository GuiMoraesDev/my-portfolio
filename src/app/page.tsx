import {
  Article,
  Chip,
  Clock,
  Code,
  Comments,
  Github,
  Globe,
  LinkedIn,
  MagnifyingGlass,
  ThumbsUp,
} from "@/assets/icons";
import { Header } from "@/components/atoms/Header";
import { Spheres } from "@/components/atoms/Spheres";
import { PinnedRepos } from "@/components/organisms/PinnedRepos";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function Home() {
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
    <main className="flex container flex-col items-center text-white bg-plum-900 pb-14 lg:pb-36">
      <Spheres />
      <Header className="max-[2000px]:px-[10vw] max-w-7xl" />

      <SessionWrapper className="md:flex-row">
        <section className="flex flex-col text-white gap-4">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h1 className="inline-flex flex-col text-2xl lg:text-2xl">
              Hey, my name is
              <strong className="inline-flex gap-1">
                Guilherme Moraes
                <span className="animate-wave text-base inline-block origin-bottom-right w-fit select-none">
                  👋
                </span>
              </strong>
            </h1>

            <h2 className="text-4xl lg:text-6xl xl:text-7xl text-gold-500 font-bold">
              I am a Frontend developer
            </h2>

            <p className="leading-normal lg:text-2xl">
              Crafting seamless User Experiences with React, TypeScript, and
              Testing Library
            </p>
          </div>

          <SocialMedia className="hidden md:flex" />
        </section>

        <section className="flex flex-col gap-2 items-center justify-center">
          <Image
            src="/profile.png"
            width={400}
            height={400}
            className="h-72 md:h-auto aspect-square object-contain select-none"
            priority
            alt=""
          />

          <SocialMedia className="flex md:hidden" />
        </section>
      </SessionWrapper>

      <SessionWrapper className="lg:flex-row">
        <section className="flex flex-col gap-10 lg:w-1/2">
          <SessionHeader
            title="Overview"
            quote='"Crafting code and stories, a snapshot of my digital
              odyssey" - ChatGPT'
          />

          <p>
            I&apos;m a passionate front-end developer who loves tackling
            challenges to build awesome, user-friendly web interfaces. I&apos;m
            all about making things look good and work seamlessly! With my
            skills I&apos;m able to create engaging experiences that people
            love. When it comes to projects, you can count on me to bring fresh
            ideas and innovative solutions to the table. Ensuring that web
            applications are not only functional but scalable is my jam.
            Let&apos;s create something awesome together!
          </p>
        </section>

        <section className="grid grid-cols-2 gap-4 items-center justify-center">
          <div className="rounded-md flex flex-col items-center justify-center w-32 lg:w-44 xl:w-52 h-24 lg:h-36 xl:h-40 bg-plum-500 gap-2 xl:gap-4">
            <Chip />
            <p className="text-xs lg:text-base xl:text-lg text-white w-4/5 text-center">
              4+ years of experience
            </p>
          </div>

          <div className="rounded-md flex flex-col items-center justify-center w-32 lg:w-44 xl:w-52 h-24 lg:h-36 xl:h-40 bg-plum-500 gap-2 xl:gap-4">
            <MagnifyingGlass />
            <p className="text-xs lg:text-base xl:text-lg text-white w-4/5 text-center">
              Attention to details for a good UX
            </p>
          </div>

          <div className="rounded-md flex flex-col items-center justify-center w-32 lg:w-44 xl:w-52 h-24 lg:h-36 xl:h-40 bg-plum-500 gap-2 xl:gap-4">
            <Code />
            <p className="text-xs lg:text-base xl:text-lg text-white w-4/5 text-center">
              Code easy to scale and maintain
            </p>
          </div>

          <div className="rounded-md flex flex-col items-center justify-center w-32 lg:w-44 xl:w-52 h-24 lg:h-36 xl:h-40 bg-plum-500 gap-2 xl:gap-4">
            <Globe />
            <p className="text-xs lg:text-base xl:text-lg text-white w-4/5 text-center">
              Working remote-first worldwide
            </p>
          </div>
        </section>
      </SessionWrapper>

      <SessionWrapper className="pt-20 lg:items-start">
        <SessionHeader
          title="Exploring my know-how"
          quote='"Lorem ipsum dolor sit amet" - lipsum.com'
        />

        <section className="flex flex-col gap-6 items-center justify-center w-full">
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
                className="rounded-md flex flex-col md:flex-row items-start md:items-center px-3 justify-center md:justify-between w-full h-24 md:h-14 bg-plum-500 gap-4 xl:gap-5"
              >
                <header className="flex gap-2 items-center justify-start">
                  <Article />
                  <p className="text-sm xl:text-lg text-white">{title}</p>
                </header>

                <div className="flex gap-9 md:gap-5 items-center justify-start">
                  <span className="inline-flex items-center text-xs justify-center gap-1.5 text-white">
                    <Clock />
                    {reading_time_minutes} min
                  </span>
                  <span className="inline-flex items-center text-xs justify-center gap-1.5 text-white">
                    <ThumbsUp />
                    {positive_reactions_count}
                  </span>
                  <span className="inline-flex items-center text-xs justify-center gap-1.5 text-white">
                    <Comments />
                    {comments_count}
                  </span>
                </div>
              </div>
            )
          )}
        </section>
      </SessionWrapper>

      <SessionWrapper className="lg:items-start">
        <SessionHeader
          title="What's the buzz about me?"
          quote='"He is my handsome pretty boy" - Mom'
        />

        <section className="flex flex-wrap xl:flex-nowrap gap-14 items-center justify-center w-full">
          {testimonials.map(({ id, name, role, content }) => (
            <div
              key={id}
              className="rounded-md flex flex-col max-w-xs md:max-w-[45%] lg:max-w-xs items-center border-8 border-plum-500 px-3 justify-center md:justify-between w-full bg-plum-50"
            >
              <Image
                src="/testimonial-placeholder.png"
                width={75}
                height={75}
                className="h-auto aspect-square object-contain select-none -translate-y-1/3"
                priority
                alt=""
              />

              <div className="flex flex-col gap-4 md:gap-5 items-center justify-start w-full pb-6">
                <p className="w-full text-sm leading-tight text-gray-800">
                  {content}
                </p>

                <strong className="leading-tight text-lg font-medium text-gray-900">
                  {name}
                </strong>
                <p className="leading-tight text-sm font-bold text-gray-950">
                  {role}
                </p>
              </div>
            </div>
          ))}
        </section>
      </SessionWrapper>

      <SessionWrapper className="justify-start items-start">
        <SessionHeader
          title="Talk is cheap. Show me the code."
          quote='"The code is the documentation" - Unknown'
        />

        <section className="flex flex-wrap gap-14 items-center justify-center w-full">
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
      "relative z-10 flex flex-col max-[2000px]:px-[10vw] w-full max-w-7xl h-full gap-10 items-center justify-between",
      "pt-14 xl:pt-36",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const SocialMedia = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={twMerge("gap-10 items-center", className)} {...props}>
    <Link
      href="https://github.com/GuiMoraesDev"
      className="cursor-pointer group flex flex-col items-center justify-center p-4"
    >
      <Github />

      <span className="text-xs text-white">GitHub</span>
    </Link>

    <Link
      href="https://www.linkedin.com/in/guimoraesdev"
      className="cursor-pointer group flex flex-col items-center justify-center p-4"
    >
      <LinkedIn />

      <span className="text-xs text-white">LinkedIn</span>
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
    className={twMerge("flex flex-col gap-6 w-full", className)}
    {...props}
  >
    <h2 className="text-xl font-bold lg:text-2xl">{title}</h2>

    <p className="leading-normal text-sm">{quote}</p>
  </header>
);
