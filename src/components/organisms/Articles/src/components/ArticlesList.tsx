"use client";

import {
  FileTextIcon,
  HeartFilledIcon,
  KeyboardIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { type DevDotToArticle } from "@/app/api/articles/list/src/@types";
import { createRevealVariants } from "@/components/atoms/Motion/utils";

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
        <AnimatedArticle key={id} index={index}>
          {({ linkClassName }) => (
            <motion.a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
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
                    aria-hidden
                  />
                  {reading_time_minutes} min
                </span>
                <span className="inline-flex w-max flex-nowrap items-center justify-center gap-1.5 text-xs text-plum-100">
                  <HeartFilledIcon
                    className="h-4 w-4 text-plum-200"
                    aria-hidden
                  />
                  {positive_reactions_count}
                </span>
                <span className="inline-flex w-max flex-nowrap items-center justify-center gap-1.5 text-xs text-plum-100">
                  <KeyboardIcon className="h-4 w-4 text-plum-200" aria-hidden />
                  {comments_count}
                </span>
              </section>
            </motion.a>
          )}
        </AnimatedArticle>
      ),
    )}
  </div>
);

type AnimatedArticleProps = {
  index: number;
  children: (props: { linkClassName: string }) => ReactNode;
};

const AnimatedArticle = ({ index, children }: AnimatedArticleProps) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
    >
      <motion.div
        variants={createRevealVariants({
          index,
          direction: "x",
          reducedMotion: Boolean(reducedMotion),
        })}
      >
        {children({
          linkClassName:
            "group flex w-full flex-col gap-4 border-b border-plum-700/60 py-5 transition-colors duration-200 hover:border-border-strong md:flex-row md:items-center md:justify-between md:gap-8",
        })}
      </motion.div>
    </motion.div>
  );
};
