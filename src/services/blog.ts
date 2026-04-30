import { blogPosts, type BlogPost } from "@/data/blog-posts";

export type { BlogPost };

export const getAllPosts = (): BlogPost[] =>
  [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

export const getLatestPosts = (count = 3): BlogPost[] =>
  getAllPosts().slice(0, count);

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export type PostsByYear = Record<string, Record<string, BlogPost[]>>;

export const groupPostsByYearMonth = (): PostsByYear => {
  const sorted = getAllPosts();
  const result: PostsByYear = {};

  for (const post of sorted) {
    const d = new Date(post.date);
    const year = String(d.getFullYear());
    const month = d.toLocaleString("en-US", { month: "long" });

    if (!result[year]) result[year] = {};
    if (!result[year][month]) result[year][month] = [];
    result[year][month].push(post);
  }

  return result;
};
