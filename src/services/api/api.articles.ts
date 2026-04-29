import { headers } from "next/headers";

import { type DevDotToArticle } from "@/app/api/articles/list/src/@types";

const getOrigin = async () => {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
};

const list = async (): Promise<{
  data: DevDotToArticle[];
}> => {
  const origin = await getOrigin();
  const response = await fetch(`${origin}/api/articles/list`, {
    method: "GET",
  });
  return response.json();
};

export const articles = {
  list,
};
