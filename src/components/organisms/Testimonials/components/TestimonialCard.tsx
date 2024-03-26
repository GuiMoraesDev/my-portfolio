import { motion, type MotionProps } from "framer-motion";
import Image from "next/image";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { type Testimonial } from "../data/testimonials";

type TestimonialCardProps = MotionProps & {
  testimonial: Testimonial;
  index: number;
};

export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ testimonial, index, ...props }, ref) => {
    return (
      <motion.div
        className={twMerge(
          "flex h-full w-full flex-col items-center justify-start gap-6",
        )}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        {...props}
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
          ref={ref}
        >
          <div className="flex w-full items-start justify-start gap-2">
            <Image
              src={testimonial.img.src}
              width={50}
              height={50}
              className="aspect-square h-auto select-none rounded-full object-contain"
              alt={testimonial.img.alt}
            />

            <section className="flex w-full flex-col items-start justify-start gap-1">
              <strong className="text-lg font-bold leading-tight">
                {testimonial.name}
              </strong>

              <p className="text-xs font-medium leading-tight">
                <b>{testimonial.role}</b> at {testimonial.company}
              </p>
            </section>
          </div>

          <p className="inline-flex h-max w-full items-start justify-start px-2 leading-tight tracking-wide lg:h-full">
            {testimonial.content}
          </p>
        </motion.div>
      </motion.div>
    );
  },
);
TestimonialCard.displayName = "TestimonialCard";

export const SkeletonTestimonialCard = () => {
  return (
    <div
      className={twMerge(
        "flex w-full flex-1 flex-col items-center justify-start gap-6",
        "col-span-1 row-span-1 flex-1",
      )}
    >
      <div
        className={twMerge(
          "flex w-full flex-1 flex-col items-center justify-start gap-6 rounded-md bg-plum-500/90 p-4 text-white backdrop-blur-sm",
        )}
      >
        <div className="flex w-full items-start justify-start gap-2">
          <span className="aspect-square h-[50px] w-[50px] animate-pulse select-none rounded-full bg-white/80 object-contain" />

          <section className="flex w-full flex-col items-start justify-start gap-1">
            <span className="h-6 w-36 animate-pulse rounded-md bg-white/80" />

            <span className="h-4 w-full max-w-[max(40%,_220px)] animate-pulse rounded-md bg-white/80" />
          </section>
        </div>

        <p className="inline-flex h-max w-full flex-col items-start justify-start gap-1">
          <span className="h-4 w-full animate-pulse rounded-md bg-white/80" />
          <span className="h-4 w-full animate-pulse rounded-md bg-white/80" />
          <span className="h-4 w-full animate-pulse rounded-md bg-white/80" />
          <span className="h-4 w-full animate-pulse rounded-md bg-white/80" />
        </p>
      </div>
    </div>
  );
};
