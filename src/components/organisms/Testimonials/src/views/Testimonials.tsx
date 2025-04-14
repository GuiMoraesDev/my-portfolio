import pick from "lodash/pick";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { ShowMoreButton } from "../components/ShowMoreButton";
import { TestimonialsList } from "../components/TestimonialsList";
import { TestimonialsSkeleton } from "../components/TestimonialsSkeleton";
import { TestimonialsProvider } from "../provider/TestimonialsProvider";

import { api } from "@/services/api";

const TestimonialsFetch = async () => {
  const { data: testimonials } = await api.testimonials.list();

  return <TestimonialsList testimonials={testimonials} />;
};

export const TestimonialsView = async () => {
  const messages = await getMessages();
  const t = await getTranslations("references");

  const skeletonArray = Array.from({ length: 3 }, (_, index) => index);

  return (
    <TestimonialsProvider>
      <div className="flex w-full flex-col gap-4">
        <section className="grid w-full flex-1 grid-cols-1 flex-wrap gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Suspense
            fallback={skeletonArray.map((_, index) => (
              <TestimonialsSkeleton key={index} />
            ))}
          >
            <NextIntlClientProvider messages={pick(messages, "references")}>
              <TestimonialsFetch />

              <section className="flex flex-col items-center justify-between gap-4">
                <a
                  href="https://www.linkedin.com/in/guimoraesdev/details/recommendations/"
                  target="_blank"
                  className="ml-auto rounded-sm p-3 text-center text-sm font-medium leading-tight text-plum-200 hover:underline"
                >
                  {t("leave-reference")}
                </a>

                <ShowMoreButton />
              </section>
            </NextIntlClientProvider>
          </Suspense>
        </section>
      </div>
    </TestimonialsProvider>
  );
};
