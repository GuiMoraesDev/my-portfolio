"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { SkeletonTestimonialCard } from "./components/TestimonialCard";
import { allTestimonials } from "./data/testimonials";
const TestimonialCard = dynamic(
  () =>
    import("./components/TestimonialCard").then((mod) => mod.TestimonialCard),
  {
    ssr: false,
    loading: () => <SkeletonTestimonialCard />,
  },
);

export const TestimonialComponent = () => {
  const firstRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const t = useTranslations("references");

  const testimonials = showAll ? allTestimonials : allTestimonials.slice(0, 3);

  const handleToggleShowMore = (currState: boolean) => {
    setShowAll((state) => !state);

    if (currState) {
      return firstRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    lastRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <section className="grid w-full flex-1 grid-cols-1 flex-wrap gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            className={twMerge(
              "col-span-1 row-span-1 flex-1",
              testimonial.className,
            )}
            key={testimonial.name}
          >
            <TestimonialCard
              testimonial={testimonial}
              index={index}
              ref={
                index === 0
                  ? firstRef
                  : index === testimonials.length - 1
                    ? lastRef
                    : null
              }
            />
          </div>
        ))}
      </section>

      <section className="flex flex-col items-center justify-between gap-4">
        <a
          href="https://www.linkedin.com/in/guimoraesdev/details/recommendations/"
          target="_blank"
          className="ml-auto rounded-sm p-3 text-center text-sm font-medium leading-tight text-plum-200 hover:underline"
        >
          {t("leave-reference")}
        </a>

        <button
          onClick={() => handleToggleShowMore(showAll)}
          className="rounded-sm bg-white p-3 text-center text-sm font-medium leading-tight text-plum-500"
        >
          {showAll ? t("show-less") : t("show-more")}
        </button>
      </section>
    </div>
  );
};
