import { ArticlesList } from "../components/ArticlesList";

import { getLatestPosts } from "@/services/blog";

export const ArticlesView = () => {
  const posts = getLatestPosts(3);
  return <ArticlesList posts={posts} />;
};
