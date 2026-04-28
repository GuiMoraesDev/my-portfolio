"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

import { useTestimonials } from "../provider/TestimonialsProvider";

import { type Testimonial } from "@/app/api/testimonials/list/src/@types";
import { createRevealVariants } from "@/components/atoms/Motion/utils";

type TestimonialsListProps = {
  testimonials: Testimonial[];
};

export const TestimonialsList = ({ testimonials }: TestimonialsListProps) => {
  const firstRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);

  const { showMore } = useTestimonials();
  const reducedMotion = useReducedMotion();

  const testimonialsList = showMore ? testimonials : testimonials.slice(0, 3);

  return (
    <>
      {testimonialsList.map(({ name, img, role, company, content }, index) => (
        <div className="col-span-1 row-span-1 flex-1" key={name}>
          <motion.div
            className={twMerge("flex h-full w-full flex-col items-center justify-start")}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
          >
            <motion.div
              className={twMerge(
                "flex w-full flex-1 flex-col items-center justify-start gap-5 border-l border-plum-600/70 px-4 py-2 text-white",
              )}
              variants={createRevealVariants({
                index,
                direction: "y",
                reducedMotion: Boolean(reducedMotion),
              })}
              ref={
                index === 0
                  ? firstRef
                  : index === testimonials.length - 1
                    ? lastRef
                    : null
              }
            >
              <div className="flex w-full items-start justify-start gap-3">
                <Image
                  src={img.src}
                  width={50}
                  height={50}
                  className="aspect-square h-auto rounded-full object-contain select-none"
                  alt={img.alt}
                />

                <section className="flex w-full flex-col items-start justify-start gap-1">
                  <strong className="text-lg leading-tight font-bold">
                    {name}
                  </strong>

                  <p className="text-xs leading-tight font-medium">
                    <b>{role}</b> at {company}
                  </p>
                </section>
              </div>

              <p className="inline-flex h-max w-full items-start justify-start px-1 leading-relaxed tracking-wide lg:h-full">
                {content}
              </p>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </>
  );
};
