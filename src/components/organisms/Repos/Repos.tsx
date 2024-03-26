"use client";

import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import { ImageComponent } from "@/components/atoms/Image";

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
    title: "My portfolio",
    description_key: "my-portfolio",
    github_link: "https://github.com/GuiMoraesDev/my-portfolio",
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
        name: "Next-intl",
        color: "#FF0000",
        link: "https://next-intl-docs.vercel.app/",
      },
      {
        name: "Radix UI",
        color: "#000000",
        link: "https://radix-ui.com/",
      },
      {
        name: "OpenAI",
        color: "#00FF00",
        link: "https://openai.com/",
      },
    ],
  },
  {
    title: "Lnk.bio",
    description_key: "lnk-bio",
    github_link: "https://github.com/GuiMoraesDev/lnk.bio",
    cover: "/projects/lnk.bio.png",
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
      "https://raw.githubusercontent.com/GuiMoraesDev/prep-pal/main/public/cover.png",
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
          <motion.li
            key={title}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            className="group flex w-full"
          >
            <motion.div
              className="flex w-full flex-col gap-3 overflow-hidden rounded-lg bg-plum-50 p-4 text-plum-500 shadow-md lg:flex-row"
              variants={{
                offscreen: {
                  x: index % 2 === 0 ? 50 : -50,
                  opacity: 0,
                },
                onscreen: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    bounce: 0.25,
                    duration: 0.8,
                    delay: 0.2 * (index + 1),
                  },
                },
              }}
            >
              <div
                className={twMerge(
                  "relative block aspect-video h-full w-auto min-w-[45%] overflow-clip rounded-md transition",
                  index % 2 === 0 ? "lg:order-0" : "lg:order-1",
                )}
              >
                <ImageComponent
                  src={cover}
                  fill
                  className="select-none object-cover drop-shadow-[0px_0px_4px_rgba(242,226,236,0.2)]"
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
            </motion.div>
          </motion.li>
        ),
      )}
    </ul>
  );
};
