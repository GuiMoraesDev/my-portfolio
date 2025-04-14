import { headers } from "next/headers";

import { type Testimonial } from "@/app/api/testimonials/list/src/@types";

const list = async (): Promise<{
  data: Testimonial[];
}> => {
  const headersList = await headers();
  const domain = headersList.get("x-current-origin");

  const { href } = new URL(`${domain}/api/testimonials/list`);

  const response = await fetch(href, {
    method: "GET",
  });
  return response.json();
};

export const testimonials = {
  list,
};
