import { Github, LinkedIn } from "@/assets/icons";
import { Header } from "@/components/atoms/Header";
import { Spheres } from "@/components/atoms/Spheres";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex max-w-6xl w-full flex-col bg-plum-900">
      <Spheres />
      <Header className="relative z-10 h-16 px-[10%] xl:px-0" />

      <div className="relative z-10 flex flex-col md:flex-row px-[10%] xl:px-0 py-12 lg:py-36 w-full h-full gap-10  justify-between items-center">
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
    </main>
  );
}
