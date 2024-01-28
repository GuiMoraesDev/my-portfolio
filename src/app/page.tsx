import { Github, LinkedIn } from "@/assets/icons";
import { Header } from "@/components/atoms/Header";
import { Spheres } from "@/components/atoms/Spheres";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex max-w-6xl w-full flex-col bg-plum-900">
      <Spheres />
      <Header className="h-16" />

      <div className="flex h-[calc(80dvh-(16*4px))] justify-center items-center">
        <section className="flex w-full h-full gap-10 justify-between items-center">
          <div className="flex flex-col text-white gap-10">
            <section className="flex flex-col gap-6 max-w-2xl">
              <h1 className="text-2xl">
                Hey, my name is Guilherme Moraes{" "}
                <span className="animate-wave inline-block origin-bottom-right w-fit select-none">
                  👋
                </span>
              </h1>

              <h2 className="text-5xl text-gold-500 font-bold">
                I am a Frontend developer
              </h2>

              <p className="leading-normal text-2xl">
                Crafting seamless User Experiences with React, TypeScript, and
                Testing Library
              </p>
            </section>

            <div className="flex gap-10 items-center">
              <Link
                href="https://github.com/GuiMoraesDev"
                className="cursor-pointer relative group flex flex-col items-center justify-center p-4"
              >
                <Github />

                <span className="absolute -bottom-2 text-sm text-white opacity-0 transition group-hover:opacity-100">
                  GitHub
                </span>
              </Link>

              <Link
                href="https://www.linkedin.com/in/guimoraesdev"
                className="cursor-pointer relative group flex flex-col items-center justify-center p-4"
              >
                <LinkedIn />

                <span className="absolute -bottom-2 text-sm text-white opacity-0 transition group-hover:opacity-100">
                  LinkedIn
                </span>
              </Link>
            </div>
          </div>

          <Image
            src="/myPic.png"
            width={400}
            height={400}
            className="h-full object-contain select-none"
            alt=""
          />
        </section>
      </div>
    </main>
  );
}
