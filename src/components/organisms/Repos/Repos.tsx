"use client";

import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";

import { SkeletonReposCard } from "./components/ReposCard";
import { repositories } from "./data/repositories";

const ReposCard = dynamic(
  () => import("./components/ReposCard").then((mod) => mod.ReposCard),
  {
    ssr: false,
    loading: () => <SkeletonReposCard />,
  },
);

export const ReposComponent = () => {
  return (
    <ul
      className={twMerge(
        "flex w-full flex-col items-center justify-center gap-10",
      )}
    >
      {repositories?.map((props, index) => (
        <ReposCard {...props} key={props.title} index={index} />
      ))}
    </ul>
  );
};
