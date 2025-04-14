import { headers } from "next/headers";

import { type DevDotToArticle } from "@/app/api/articles/list/src/@types";

const list = async (): Promise<{
  data: DevDotToArticle[];
}> => {
  const headersList = await headers();
  const domain = headersList.get("x-current-origin");

  const { href } = new URL(`${domain}/api/articles/list`);

  const response = await fetch(href, {
    method: "GET",
  });
  return response.json();
};

export const articles = {
  list,
};
