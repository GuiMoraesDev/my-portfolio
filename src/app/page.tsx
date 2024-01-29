import { Chip, Github, LinkedIn } from "@/assets/icons";
import { Header } from "@/components/atoms/Header";
import { Spheres } from "@/components/atoms/Spheres";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
            className="h-full object-contain select-none"
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

            <p className="leading-normal text-xs lg:text-2xl">
              &quot;Crafting code and stories, a snapshot of my digital
              odyssey&quot; - ChatGPT
            </p>
          </div>

          <div className="flex gap-10 items-center">
            <p>
              I&apos;m a passionate front-end developer who loves tackling
              challenges to build awesome, user-friendly web interfaces.
              I&apos;m all about making things look good and work seamlessly!
              With my skills I&apos;m able to create engaging experiences that
              people love. When it comes to projects, you can count on me to
              bring fresh ideas and innovative solutions to the table. Ensuring
              that web applications are not only functional but scalable is my
              jam. Let&apos;s create something awesome together!
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 items-center justify-center">
          <div className="rounded-md flex flex-col items-center justify-center w-[110px] lg:w-[165px] xl:w-[220px] h-[90px] lg:h-[135px] xl:h-[180px] bg-plum-500 gap-2 xl:gap-4">
            <Chip />
            <p className="text-xs lg:text-xl text-white w-4/5 xl:w-1/2 text-center">
              4+ years of experience
            </p>
          </div>
          <div className="rounded-md flex flex-col items-center justify-center w-[110px] lg:w-[165px] xl:w-[220px] h-[90px] lg:h-[135px] xl:h-[180px] bg-plum-500 gap-2 xl:gap-4">
            <Chip />
            <p className="text-xs lg:text-xl text-white w-4/5 xl:w-1/2 text-center">
              4+ years of experience
            </p>
          </div>
          <div className="rounded-md flex flex-col items-center justify-center w-[110px] lg:w-[165px] xl:w-[220px] h-[90px] lg:h-[135px] xl:h-[180px] bg-plum-500 gap-2 xl:gap-4">
            <Chip />
            <p className="text-xs lg:text-xl text-white w-4/5 xl:w-1/2 text-center">
              4+ years of experience
            </p>
          </div>
          <div className="rounded-md flex flex-col items-center justify-center w-[110px] lg:w-[165px] xl:w-[220px] h-[90px] lg:h-[135px] xl:h-[180px] bg-plum-500 gap-2 xl:gap-4">
            <Chip />
            <p className="text-xs lg:text-xl text-white w-4/5 xl:w-1/2 text-center">
              4+ years of experience
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
