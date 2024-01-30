"use client";

import { Github, Link } from "@/assets/icons";
import { useGitHubPinnedRepositories } from "@/graphql/github-profile";
import Image from "next/image";

export const PinnedRepos = () => {
  const { data = [] } = useGitHubPinnedRepositories();

  return (
    <ul className="flex w-full flex-col lg:flex-row items-center justify-center gap-6">
      {data?.map(({ id, project_link, github_link, title }) => (
        <li key={id} className="relative flex w-96 flex-col gap-3">
          <nav className="absolute top-0.5 left-0.5 flex items-center gap-2 bg-plum-500 rounded-md">
            {project_link ? (
              <a
                className="p-2"
                href={project_link}
                aria-label={`${title} project link: ${project_link}`}
                title={`${title} project link: ${project_link}`}
                target="_blank"
              >
                <Link />
              </a>
            ) : null}

            <a
              className="p-2"
              href={github_link}
              aria-label={`${title} github link: ${project_link}`}
              title={`${title} github link: ${project_link}`}
              target="_blank"
            >
              <Github />
            </a>
          </nav>

          <Image
            src={`https://raw.githubusercontent.com/GuiMoraesDev/${title}/main/public/img/cover.png`}
            alt={title}
            width={320}
            height={168}
            className="aspect-video h-full w-full overflow-hidden rounded-lg object-cover"
            style={{ height: "100%" }}
          />

          <p className=" absolute bottom-0.5 right-0.5 capitalize  bg-plum-500 rounded-md p-2 text-white ">
            {title}
          </p>
        </li>
      ))}
    </ul>
  );
};
