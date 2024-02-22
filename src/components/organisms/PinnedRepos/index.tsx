"use client";

import Image from "next/image";

import { Icon } from "@/components/atoms/Icon";
import { useGitHubPinnedRepositories } from "@/graphql/github-profile";

export const PinnedRepos = () => {
  const { data = [], isLoading } = useGitHubPinnedRepositories();

  return (
    <ul className="flex w-full flex-wrap items-center justify-center gap-10">
      {isLoading ? (
        <PinnedReposSkeleton />
      ) : (
        data?.map(({ id, project_link, github_link, title }) => (
          <li
            key={id}
            className="group relative flex w-full max-w-xs flex-col items-center justify-center gap-3 overflow-hidden rounded-lg bg-plum-50 p-4 shadow-md md:max-w-[45%] lg:max-w-xs"
          >
            <nav className="absolute left-0.5 top-0.5 flex items-center gap-2 rounded-md bg-plum-500 group-hover:opacity-100 lg:opacity-0">
              {project_link ? (
                <a
                  className="inline-flex p-2"
                  href={project_link}
                  aria-label={`${title} project link: ${project_link}`}
                  title={`${title} project link: ${project_link}`}
                  target="_blank"
                >
                  <Icon icon="Link" size="sm" />
                </a>
              ) : null}

              <a
                className="inline-flex p-2"
                href={github_link}
                aria-label={`${title} github link: ${project_link}`}
                title={`${title} github link: ${project_link}`}
                target="_blank"
              >
                <Icon icon="Github" size="sm" />
              </a>
            </nav>

            <Image
              src={`https://raw.githubusercontent.com/GuiMoraesDev/${title}/main/public/cover.png`}
              alt={title}
              width={320}
              height={168}
              className="aspect-video h-auto w-full overflow-hidden rounded-lg border border-plum-100 object-cover"
            />

            <p className="absolute bottom-0.5 right-0.5 w-1/2 rounded-md bg-plum-500 py-2 text-center text-xs capitalize text-white group-hover:opacity-100 min-[340px]:text-sm lg:opacity-0">
              {title}
            </p>
          </li>
        ))
      )}
    </ul>
  );
};

const PinnedReposSkeleton = () =>
  Array.from({ length: 3 }).map((_, index) => (
    <li
      key={index}
      className="relative flex w-full max-w-xs flex-col items-center justify-center gap-3 overflow-hidden rounded-lg bg-plum-50 p-4 shadow-md md:max-w-[45%] lg:max-w-xs"
    >
      <nav className="absolute left-0.5 top-0.5 z-10 flex items-center gap-2 rounded-md opacity-100">
        <span className="h-6 w-6 rounded-md bg-plum-300" />

        <span className="h-6 w-6 rounded-md bg-plum-300" />
      </nav>

      <div className="aspect-video h-32 w-full animate-pulse rounded-lg bg-plum-800" />

      <span className="absolute bottom-0.5 right-0.5 h-6 w-1/2 rounded-md bg-plum-300 py-2 text-center text-xs capitalize text-white opacity-100 min-[340px]:text-sm" />
    </li>
  ));
