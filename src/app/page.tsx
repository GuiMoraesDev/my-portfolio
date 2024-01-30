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
import Image from "next/image";
import Link from "next/link";

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

  return (
    <main className="flex max-w-6xl w-full flex-col bg-plum-900">
      <Spheres />
      <Header className="relative z-10 h-16 px-[10%] xl:px-0" />

      <div className="relative z-10 flex flex-col md:flex-row px-[10%] xl:px-0 pt-12 lg:pt-36 w-full h-full gap-10  justify-between items-center">
        <section className="flex flex-col text-white gap-10">
          <div className="flex flex-col gap-6 max-w-2xl">
            <h1 className="text-lg lg:text-2xl">
              Hey, my name is Guilherme Moraes{" "}
              <span className="animate-wave inline-block origin-bottom-right w-fit select-none">
                👋
              </span>
            </h1>

            <h2 className="text-2xl lg:text-5xl text-gold-500 font-bold">
              I am a Frontend developer
            </h2>

            <p className="leading-normal text-lg lg:text-2xl">
              Crafting seamless User Experiences with React, TypeScript, and
              Testing Library
            </p>
          </div>

          <div className="gap-10 items-center hidden md:flex">
            <Link
              href="https://github.com/GuiMoraesDev"
              className="cursor-pointer group flex flex-col items-center justify-center p-4"
            >
              <Github />

              <span className="text-sm text-white">GitHub</span>
            </Link>

            <Link
              href="https://www.linkedin.com/in/guimoraesdev"
              className="cursor-pointer group flex flex-col items-center justify-center p-4"
            >
              <LinkedIn />

              <span className="text-sm text-white">LinkedIn</span>
            </Link>
          </div>
        </section>

        <section className="flex flex-col gap-4 items-center justify-center">
          <Image
            src="/myPic.png"
            width={400}
            height={400}
            className="h-auto aspect-square object-contain select-none"
            priority
            alt=""
          />

          <div className="flex gap-10 items-center md:hidden">
            <Link
              href="https://github.com/GuiMoraesDev"
              className="cursor-pointer group flex flex-col items-center justify-center p-4"
            >
              <Github />

              <span className="text-sm text-white">GitHub</span>
            </Link>

            <Link
              href="https://www.linkedin.com/in/guimoraesdev"
              className="cursor-pointer group flex flex-col items-center justify-center p-4"
            >
              <LinkedIn />

              <span className="text-sm text-white">LinkedIn</span>
            </Link>
          </div>
        </section>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row px-[10%] xl:px-0 pt-12 lg:pt-36 w-full h-full gap-10  justify-between items-center">
        <section className="flex flex-col text-white gap-10 lg:w-1/2">
          <div className="flex flex-col gap-6 max-w-2xl">
            <h2 className="text-lg lg:text-2xl">Overview</h2>

            <p className="leading-normal text-xs lg:text-sm">
              &quot;Crafting code and stories, a snapshot of my digital
              odyssey&quot; - ChatGPT
            </p>
          </div>

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
      </div>

      <div className="relative z-10 flex flex-col px-[10%] xl:px-0 pt-12 lg:pt-36 w-full h-full gap-10  justify-between items-center lg:items-start">
        <section className="flex flex-col text-white gap-10 lg:w-1/2">
          <div className="flex flex-col gap-6 max-w-2xl">
            <h2 className="text-lg lg:text-2xl">Exploring my know-how</h2>

            <p className="leading-normal text-xs lg:text-sm">
              &quot;Lorem ipsum dolor sit amet&quot; - lipsum.com
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 items-center justify-center w-full">
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
      </div>
    </main>
  );
}
