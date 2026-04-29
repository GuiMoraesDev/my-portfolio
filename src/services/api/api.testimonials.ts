import { type Testimonial } from "@/app/api/testimonials/list/src/@types";

const list = async (): Promise<{
  data: Testimonial[];
}> => {
  const response = await fetch("/api/testimonials/list", {
    method: "GET",
  });
  return response.json();
};

export const testimonials = {
  list,
};
