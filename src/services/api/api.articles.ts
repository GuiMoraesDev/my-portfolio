import { type DevDotToArticle } from "@/app/api/articles/list/src/@types";

const list = async (): Promise<{
  data: DevDotToArticle[];
}> => {
  const response = await fetch("/api/articles/list", {
    method: "GET",
  });
  return response.json();
};

export const articles = {
  list,
};
