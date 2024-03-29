import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import { type Repository } from "../data/repositories";

import { ImageComponent } from "@/components/atoms/Image";

type ReposCardProps = Repository & {
  index: number;
};

export const ReposCard = ({
  cover,
  github_link,
  tech_stack,
  title,
  description_key,
  project_link,
  index,
}: ReposCardProps) => {
  const t = useTranslations("projects");

  return (
    <motion.li
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
        <div className="relative block aspect-video h-full w-auto min-w-[45%] overflow-clip rounded-md transition">
          <ImageComponent
            src={cover}
            fill
            className="select-none object-cover drop-shadow-[0px_0px_4px_rgba(242,226,236,0.2)]"
            alt={title}
          />
        </div>

        <section className="flex w-full flex-col gap-4">
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
  );
};

export const SkeletonReposCard = () => (
  <li className={twMerge("group flex w-full")}>
    <div className="flex w-full flex-col gap-3 overflow-hidden rounded-lg bg-plum-50 p-4 shadow-md lg:flex-row">
      <div
        className={twMerge(
          "relative block aspect-video h-full w-auto min-w-[45%] overflow-clip rounded-md transition",
        )}
      >
        <span className="block h-full w-full animate-pulse rounded-md bg-plum-500/80" />
      </div>

      <section className="flex w-full flex-col gap-4">
        <span className="h-8 w-full max-w-[max(20%,_100px)] animate-pulse rounded-md bg-plum-500/80" />

        <span className="h-4 w-full animate-pulse rounded-md bg-plum-500/80" />
        <span className="h-4 w-full animate-pulse rounded-md bg-plum-500/80" />
        <span className="h-4 w-full animate-pulse rounded-md bg-plum-500/80" />

        <ul className="flex flex-wrap gap-3">
          <span className="h-8 w-8 animate-pulse rounded-md bg-plum-500/80" />
          <span className="h-8 w-8 animate-pulse rounded-md bg-plum-500/80" />
          <span className="h-8 w-8 animate-pulse rounded-md bg-plum-500/80" />
        </ul>

        <nav className="flex w-fit items-center gap-2 ">
          <a className="inline-flex animate-pulse gap-2 rounded-md bg-plum-500/80 p-2 text-white transition-colors hover:bg-plum-700">
            <Link2Icon className="h-6 w-6 " />
            Project
          </a>

          <a className="inline-flex animate-pulse gap-2 rounded-md bg-plum-500/80 p-2 text-white opacity-25 transition-colors hover:bg-plum-700">
            <GitHubLogoIcon className="h-6 w-6 " />
            Github
          </a>
        </nav>
      </section>
    </div>
  </li>
);
