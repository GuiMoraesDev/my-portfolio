import { cookies } from "next/headers";

import { type Testimonial } from "@/app/api/testimonials/list/src/@types";

const list = async (): Promise<{
  data: Testimonial[];
}> => {
  const cookiesList = await cookies();
  const domain = cookiesList.get("domain-origin");

  const { href } = new URL(`${domain?.value}/api/testimonials/list`);

  const response = await fetch(href, {
    method: "GET",
  });
  return response.json();
};

export const testimonials = {
  list,
};
