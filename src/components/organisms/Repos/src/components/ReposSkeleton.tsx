import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link2Icon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";

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
