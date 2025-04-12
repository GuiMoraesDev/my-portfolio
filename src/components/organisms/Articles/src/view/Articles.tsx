import { Suspense } from "react";

import { ArticlesList } from "../components/ArticlesList";
import { ArticlesSkeleton } from "../components/ArticlesSkeleton";

import { api } from "@/services/api";

const ArticlesFetch = async () => {
  const { data: articles } = await api.articles.list();

  return <ArticlesList articles={articles} />;
};

export const ArticlesView = () => {
  const skeletonArray = Array.from({ length: 3 }, (_, index) => index);

  return (
    <Suspense
      fallback={skeletonArray.map((_, index) => (
        <ArticlesSkeleton key={index} />
      ))}
    >
      <ArticlesFetch />
    </Suspense>
  );
};
