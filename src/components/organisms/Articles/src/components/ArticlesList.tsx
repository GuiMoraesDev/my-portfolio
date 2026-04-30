"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { createRevealVariants } from "@/components/atoms/Motion/utils";
import { type BlogPost } from "@/services/blog";

type ArticlesListProps = {
  posts: BlogPost[];
};

export const ArticlesList = ({ posts }: ArticlesListProps) => (
  <div className="flex w-full flex-col">
    {posts.map((post, index) => (
      <AnimatedArticle key={post.slug} index={index}>
        <Link
          href={`/blog/${post.slug}`}
          className="group flex w-full flex-col gap-3 border-b border-border-subtle py-5 transition-colors duration-200 hover:border-border-strong"
        >
          <p className="relative text-sm text-text-primary transition group-hover:text-accent-400 md:text-base">
            {post.title}
          </p>
          <p className="line-clamp-2 text-sm leading-snug text-text-muted">
            {post.summary}
          </p>
          <span className="text-xs text-text-muted">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            · {post.readingTime} min read
          </span>
        </Link>
      </AnimatedArticle>
    ))}
  </div>
);

type AnimatedArticleProps = {
  index: number;
  children: React.ReactNode;
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
        {children}
      </motion.div>
    </motion.div>
  );
};
