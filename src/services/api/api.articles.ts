import { cookies } from "next/headers";

import { type DevDotToArticle } from "@/app/api/articles/list/src/@types";

const list = async (): Promise<{
  data: DevDotToArticle[];
}> => {
  const cookiesList = await cookies();
  const domain = cookiesList.get("x-current-origin");

  const { href } = new URL(`${domain?.value}/api/articles/list`);

  const response = await fetch(href, {
    method: "GET",
  });
  return response.json();
};

export const articles = {
  list,
};
