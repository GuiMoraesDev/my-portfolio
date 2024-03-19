"use client";

import {
  FileTextIcon,
  HeartFilledIcon,
  KeyboardIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";

type DevToArticle = {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: null;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: string;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string;
  crossposted_at: null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: 7;
  tag_list: string[];
  tags: string;
  user: {
    name: string;
    username: string;
    twitter_username: string;
    github_username: string;
    user_id: number;
    website_url: string;
    profile_image: string;
    profile_image_90: string;
  };
};

const fetchArticles = async (): Promise<DevToArticle[]> => {
  const response = await fetch(
    "https://dev.to/api/articles?username=guimoraes",
  );
  return await response.json();
};

export const Articles = () => {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    retry: process.env.NODE_ENV === "development" ? false : 3,
  });

  if (isLoading) return <ArticlesSkeleton />;

  return (
    <>
      {articles.map(
        ({
          id,
          title,
          url,
          reading_time_minutes,
          positive_reactions_count,
          comments_count,
        }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
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
                {/* <Icon icon="Clock" size="sm" /> */}
                <StopwatchIcon
                  className="hidden h-5 w-5 text-white sm:inline-flex"
                  aria-description="reading time"
                />
                {reading_time_minutes} min
              </span>
              <span className="inline-flex w-max flex-nowrap items-center justify-center gap-1.5 text-xs text-white">
                {/* <Icon icon="ThumbsUp" size="sm" /> */}
                <HeartFilledIcon
                  className="hidden h-5 w-5 text-white sm:inline-flex"
                  aria-description="likes"
                />
                {positive_reactions_count}
              </span>
              <span className="inline-flex w-max flex-nowrap items-center justify-center gap-1.5 text-xs text-white">
                {/* <Icon icon="Comments" size="sm" /> */}
                <KeyboardIcon
                  className="hidden h-5 w-5 text-white sm:inline-flex"
                  aria-description="comments"
                />
                {comments_count}
              </span>
            </section>
          </a>
        ),
      )}
    </>
  );
};

const ArticlesSkeleton = () => (
  <div className="flex w-full flex-col items-start justify-start gap-4">
    <div className="flex h-24 w-full flex-col items-start justify-center gap-4 rounded-md bg-plum-500/90 px-5 md:h-14 md:flex-row md:items-center md:justify-between xl:gap-5">
      <div className="flex w-full items-center justify-start gap-2">
        <span className="h-4 w-4 animate-pulse rounded-md bg-white/80" />
        <span className="h-4 w-1/2 animate-pulse rounded-md bg-white/80" />
      </div>

      <div className="flex items-center justify-start gap-9 md:gap-5">
        <span className="h-4 w-4 animate-pulse rounded-md bg-white/80" />
        <span className="h-4 w-4 animate-pulse rounded-md bg-white/80" />
        <span className="h-4 w-4 animate-pulse rounded-md bg-white/80" />
      </div>
    </div>
  </div>
);
