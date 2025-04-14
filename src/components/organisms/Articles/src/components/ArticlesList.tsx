"use client";

import {
  FileTextIcon,
  HeartFilledIcon,
  KeyboardIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { type DevDotToArticle } from "@/app/api/articles/list/src/@types";

type ArticlesListProps = {
  articles: DevDotToArticle[];
};

export const ArticlesList = ({ articles }: ArticlesListProps) => (
  <div className="flex w-full flex-col gap-4">
    {articles.map(
      (
        {
          id,
          title,
          url,
          reading_time_minutes,
          positive_reactions_count,
          comments_count,
        },
        index,
      ) => (
        <motion.div
          key={id}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              offscreen: {
                x: 50,
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
            className="group flex h-24 w-full flex-col items-start justify-center gap-4 rounded-md bg-plum-500/90 px-5 md:h-14 md:flex-row md:items-center md:justify-between xl:gap-5"
          >
            <header className="flex items-center justify-start gap-2">
              <FileTextIcon className="hidden h-5 w-5 text-white sm:inline-flex" />
              <p
                className={twMerge(
                  "relative text-xs text-white min-[340px]:text-sm xl:text-base",
                  "before:absolute before:bottom-0 before:left-0 before:h-px before:w-0 before:rounded-md before:bg-white before:transition-all before:content-['']",
                  "group-hover:before:w-full",
                )}
              >
                {title}
              </p>
            </header>

            <section className="flex items-center justify-start gap-9 md:gap-5">
              <span className="inline-flex w-max flex-nowrap items-center justify-center gap-1.5 text-xs text-white">
                <StopwatchIcon
                  className="hidden h-5 w-5 text-white sm:inline-flex"
                  aria-description="reading time"
                />
                {reading_time_minutes} min
              </span>
              <span className="inline-flex w-max flex-nowrap items-center justify-center gap-1.5 text-xs text-white">
                <HeartFilledIcon
                  className="hidden h-5 w-5 text-white sm:inline-flex"
                  aria-description="likes"
                />
                {positive_reactions_count}
              </span>
              <span className="inline-flex w-max flex-nowrap items-center justify-center gap-1.5 text-xs text-white">
                <KeyboardIcon
                  className="hidden h-5 w-5 text-white sm:inline-flex"
                  aria-description="comments"
                />
                {comments_count}
              </span>
            </section>
          </motion.a>
        </motion.div>
      ),
    )}
  </div>
);
