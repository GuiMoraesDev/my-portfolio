import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { TestimonialComponent } from "./Testimonial";

export const Testimonials = () => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, "references")}>
      <TestimonialComponent />
    </NextIntlClientProvider>
  );
};
