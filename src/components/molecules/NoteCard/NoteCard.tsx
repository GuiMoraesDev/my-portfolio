"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { type Notes } from "@/data/notes";

export const NoteCard = ({
  title,
  url,
  cover,
  index,
}: Notes & { index: number }) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        variants={{
          offscreen: {
            x: 50,
            opacity: 0,
          },
          onscreen: {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              bounce: 0.25,
              duration: 0.8,
              delay: 0.2 * (index + 1),
            },
          },
        }}
        className="flex w-96 flex-col items-center justify-center gap-5 rounded-md bg-cyan p-6 text-black"
      >
        {cover && (
          <Image
            src={cover}
            alt={`cover image for ${title}`}
            className="h-auto w-full"
            width={320}
            height={134}
          />
        )}

        <p className="font-body text-lg font-medium">{title}</p>
      </motion.a>
    </motion.div>
  );
};
