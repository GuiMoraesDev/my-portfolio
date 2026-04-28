"use client";

import {
  FileTextIcon,
  HeartFilledIcon,
  KeyboardIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

import { type DevDotToArticle } from "@/app/api/articles/list/src/@types";

type ArticlesListProps = {
  articles: DevDotToArticle[];
};

export const ArticlesList = ({ articles }: ArticlesListProps) => (
  <div className="flex w-full flex-col">
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
            className="group flex w-full flex-col gap-4 border-b border-plum-700/60 py-5 md:flex-row md:items-center md:justify-between md:gap-8"
          >
            <header className="flex items-center justify-start gap-3">
              <FileTextIcon className="h-5 w-5 text-plum-200" />
              <p
                className={twMerge(
                  "relative text-sm text-white md:text-base",
                  "before:absolute before:bottom-0 before:left-0 before:h-px before:w-0 before:rounded-md before:bg-white before:transition-all before:content-['']",
                  "group-hover:before:w-full",
                )}
              >
                {title}
              </p>
            </header>

            <section className="flex items-center justify-start gap-6 md:gap-5">
              <span className="inline-flex w-max flex-nowrap items-center justify-center gap-1.5 text-xs text-plum-100">
                <StopwatchIcon
                  className="h-4 w-4 text-plum-200"
                  aria-description="reading time"
                />
                {reading_time_minutes} min
              </span>
              <span className="inline-flex w-max flex-nowrap items-center justify-center gap-1.5 text-xs text-plum-100">
                <HeartFilledIcon
                  className="h-4 w-4 text-plum-200"
                  aria-description="likes"
                />
                {positive_reactions_count}
              </span>
              <span className="inline-flex w-max flex-nowrap items-center justify-center gap-1.5 text-xs text-plum-100">
                <KeyboardIcon
                  className="h-4 w-4 text-plum-200"
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
