"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

import { useTestimonials } from "../provider/TestimonialsProvider";

import { type Testimonial } from "@/app/api/testimonials/list/src/@types";

type TestimonialsListProps = {
  testimonials: Testimonial[];
};

export const TestimonialsList = ({ testimonials }: TestimonialsListProps) => {
  const firstRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);

  const { showMore } = useTestimonials();

  const testimonialsList = showMore ? testimonials : testimonials.slice(0, 3);

  return (
    <>
      {testimonialsList.map(({ name, img, role, company, content }, index) => (
        <div className="col-span-1 row-span-1 flex-1" key={name}>
          <motion.div
            className={twMerge(
              "flex h-full w-full flex-col items-center justify-start gap-6",
            )}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
          >
            <motion.div
              className={twMerge(
                "flex w-full flex-1 flex-col items-center justify-start gap-6 rounded-md bg-plum-500/90 p-4 text-white backdrop-blur-sm",
              )}
              variants={{
                offscreen: {
                  y: 50,
                  opacity: 0,
                },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    bounce: 0.25,
                    duration: 0.8,
                    delay: 0.2 * (index + 1),
                  },
                },
              }}
              ref={
                index === 0
                  ? firstRef
                  : index === testimonials.length - 1
                    ? lastRef
                    : null
              }
            >
              <div className="flex w-full items-start justify-start gap-2">
                <Image
                  src={img.src}
                  width={50}
                  height={50}
                  className="aspect-square h-auto select-none rounded-full object-contain"
                  alt={img.alt}
                />

                <section className="flex w-full flex-col items-start justify-start gap-1">
                  <strong className="text-lg font-bold leading-tight">
                    {name}
                  </strong>

                  <p className="text-xs font-medium leading-tight">
                    <b>{role}</b> at {company}
                  </p>
                </section>
              </div>

              <p className="inline-flex h-max w-full items-start justify-start px-2 leading-tight tracking-wide lg:h-full">
                {content}
              </p>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </>
  );
};
