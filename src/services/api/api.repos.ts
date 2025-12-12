import { cookies } from "next/headers";

import { type Repository } from "@/app/api/repos/list/src/@types";

const list = async (): Promise<{
  data: Repository[];
}> => {
  const cookiesList = await cookies();
  const domain = cookiesList.get("domain-origin");

  const { href } = new URL(`${domain?.value}/api/repos/list`);

  const response = await fetch(href, {
    method: "GET",
  });
  return response.json();
};

export const repos = {
  list,
};
