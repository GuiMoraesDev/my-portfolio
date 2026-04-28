"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

import { useTestimonials } from "../provider/TestimonialsProvider";

import { type Testimonial } from "@/app/api/testimonials/list/src/@types";
import { createRevealVariants } from "@/components/atoms/Motion/utils";

type TestimonialsListProps = {
  testimonials: Testimonial[];
};

export const TestimonialsList = ({ testimonials }: TestimonialsListProps) => {
  const { showMore } = useTestimonials();
  const reducedMotion = useReducedMotion();

  const supporting = useMemo(
    () => (showMore ? testimonials : testimonials.slice(0, 3)),
    [testimonials, showMore],
  );

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex w-full flex-wrap gap-4">
        {supporting.map(
          ({ name, role, company, relationship, content }, index) => (
            <motion.article
              key={name}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={createRevealVariants({
                index,
                direction: "y",
                reducedMotion: Boolean(reducedMotion),
              })}
              className="border-l border-[color:var(--color-border-strong)] pl-4"
            >
              <header className="mb-2">
                <strong className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                  {name}
                </strong>
                <p className="text-[color:var(--color-text-muted)] text-[var(--text-caption)]">
                  {role} at {company}
                </p>
                <p className="text-[color:var(--color-text-muted)] text-[var(--text-caption)]">
                  {relationship}
                </p>
              </header>

              <p className="text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                {content}
              </p>
            </motion.article>
          ),
        )}
      </div>
    </div>
  );
};
