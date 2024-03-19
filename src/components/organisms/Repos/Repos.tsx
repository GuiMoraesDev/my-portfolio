"use client";

import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useTranslations } from "next-intl";

type TechStack = {
  name: string;
  color: string;
  link: string;
};
type Repository = {
  title: string;
  cover: string;
  description_key?: string;
  project_link?: string;
  github_link: string;
  tech_stack: Array<TechStack>;
};
const repositories: Array<Repository> = [
  {
    title: "Lnk.bio",
    description_key: "lnk-bio",
    project_link: "https://github.com/GuiMoraesDev/lnk.bio",
    github_link: "https://github.com/GuiMoraesDev/lnk.bio",
    cover:
      "https://raw.githubusercontent.com/GuiMoraesDev/my-portfolio/main/public/cover.png",
    tech_stack: [
      {
        name: "Next.js",
        color: "#000000",
        link: "https://nextjs.org/",
      },
      {
        name: "Tailwind CSS",
        color: "#06B6D4",
        link: "https://tailwindcss.com/",
      },
      {
        name: "Typescript",
        color: "#3178C6",
        link: "https://www.typescriptlang.org/",
      },
    ],
  },
  {
    title: "Prep.pal",
    description_key: "prep-pal",
    github_link: "https://github.com/GuiMoraesDev/prep-pal",
    cover:
      "https://raw.githubusercontent.com/GuiMoraesDev/my-portfolio/main/public/cover.png",
    tech_stack: [
      {
        name: "Next.js",
        color: "#000000",
        link: "https://nextjs.org/",
      },
      {
        name: "Tailwind CSS",
        color: "#06B6D4",
        link: "https://tailwindcss.com/",
      },
      {
        name: "Typescript",
        color: "#3178C6",
        link: "https://www.typescriptlang.org/",
      },
      {
        name: "OpenAI",
        color: "#00FF00",
        link: "https://openai.com/",
      },
    ],
  },
  {
    title: "RTC Whiteboard",
    description_key: "rtc-whiteboard",
    github_link: "https://github.com/GuiMoraesDev/prep-pal",
    cover:
      "https://raw.githubusercontent.com/GuiMoraesDev/my-portfolio/main/public/cover.png",
    tech_stack: [
      {
        name: "Next.js",
        color: "#000000",
        link: "https://nextjs.org/",
      },
      {
        name: "Tailwind CSS",
        color: "#06B6D4",
        link: "https://tailwindcss.com/",
      },
      {
        name: "Typescript",
        color: "#3178C6",
        link: "https://www.typescriptlang.org/",
      },
      {
        name: "WebSockets",
        color: "#000000",
        link: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
      },
    ],
  },
];

export const ReposComponent = () => {
  const t = useTranslations("projects");

  return (
    <ul className="flex w-full flex-col items-center justify-center gap-10">
      {repositories?.map(
        (
          {
            title,
            description_key,
            cover,
            project_link,
            github_link,
            tech_stack,
          },
          index,
        ) => (
          <li
            key={title}
            className="group flex w-full flex-col gap-3 overflow-hidden rounded-lg bg-plum-50 p-4 text-plum-500 shadow-md md:flex-row"
          >
            <div
              className="relative block aspect-video h-full w-auto min-w-[45%] overflow-clip rounded-md transition"
              style={{
                order: index % 2 === 0 ? 0 : 1,
              }}
            >
              <Image
                src={cover}
                fill
                className="select-none object-cover drop-shadow-[0px_0px_4px_rgba(242,226,236,0.2)]"
                priority
                alt={title}
              />
            </div>

            <section
              className="flex w-full flex-col gap-4"
              style={{
                order: index % 2 === 0 ? 1 : 0,
              }}
            >
              <h3 className="text-2xl font-bold text-plum-700">{title}</h3>

              <p className="h-full overflow-hidden text-ellipsis">
                {t("cards-description." + description_key)}
              </p>

              <ul className="flex flex-wrap gap-3">
                {tech_stack.map(({ name, color, link }) => (
                  <li
                    key={name}
                    className="flex items-center gap-1 rounded-lg bg-white p-1.5 text-sm"
                  >
                    <a
                      href={link}
                      className="inline-flex items-center gap-1"
                      target="_blank"
                    >
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span>{name}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <nav className="flex w-fit items-center gap-2 ">
                {project_link && (
                  <a
                    className="inline-flex gap-2 rounded-md bg-plum-500 p-2 text-white transition-colors hover:bg-plum-700"
                    href={project_link}
                    aria-label={`${title} project link: ${project_link}`}
                    title={`${title} project link: ${project_link}`}
                    target="_blank"
                  >
                    <Link2Icon className="h-6 w-6 " />
                    Project
                  </a>
                )}

                <a
                  className="inline-flex gap-2 rounded-md bg-plum-500 p-2 text-white transition-colors hover:bg-plum-700"
                  href={github_link}
                  aria-label={`${title} github link: ${project_link}`}
                  title={`${title} github link: ${project_link}`}
                  target="_blank"
                >
                  <GitHubLogoIcon className="h-6 w-6 " />
                  Github
                </a>
              </nav>
            </section>
          </li>
        ),
      )}
    </ul>
  );
};
