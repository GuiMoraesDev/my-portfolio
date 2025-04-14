import { headers } from "next/headers";

import { type Repository } from "@/app/api/repos/list/src/@types";

const list = async (): Promise<{
  data: Repository[];
}> => {
  const headersList = await headers();
  const domain = headersList.get("x-current-origin");

  const { href } = new URL(`${domain}/api/repos/list`);

  const response = await fetch(href, {
    method: "GET",
  });
  return response.json();
};

export const repos = {
  list,
};
