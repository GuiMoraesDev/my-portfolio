"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const ProfileImageComponent = () => {
  const t = useTranslations("presentation");

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        ease: "linear",
      }}
      className="relative h-[240px] w-[240px] transition-all sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80"
    >
      <Image
        src="/profile.png"
        fill
        sizes="100%"
        className="aspect-square h-72 select-none object-cover drop-shadow-[0px_0px_4px_rgba(242,226,236,0.2)] md:h-auto"
        priority
        alt={t("presentation.profile-image-alt")}
      />
    </motion.div>
  );
};
