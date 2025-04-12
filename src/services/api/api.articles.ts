import { type DevDotToArticle } from "@/app/api/articles/list/route";

const list = async (): Promise<{
  data: DevDotToArticle[];
}> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/articles/list",
    {
      method: "GET",
    },
  );
  return response.json();
};

export const articles = {
  list,
};
