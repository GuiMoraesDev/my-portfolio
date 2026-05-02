import {
  Cross2Icon,
  HamburgerMenuIcon,
  DownloadIcon,
  QuoteIcon,
} from "@radix-ui/react-icons";
import { type VariantProps, tv } from "tailwind-variants";

import "./styles.css";
import { Github, LinkedIn } from "./CustomIcons";

const icons = {
  Github,
  LinkedIn,
  Cross: Cross2Icon,
  HamburgerMenu: HamburgerMenuIcon,
  Download: DownloadIcon,
  Quote: QuoteIcon,
};

const iconVariants = tv({
  base: "inline-flex items-center justify-center overflow-hidden",
  variants: {
    rounded: {
      full: "rounded-full",
    },
    size: {
      sm: "size-3 md:size-4 lg:size-5",
      md: "size-5 md:size-6 lg:size-7",
      lg: "size-7 md:size-8 lg:size-9",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type IconProps = VariantProps<typeof iconVariants> & {
  name: keyof typeof icons;
  className?: string;
};

export const Icon = ({ size, name, rounded, className }: IconProps) => {
  const IconComponent = icons[name];

  return (
    <IconComponent
      className={iconVariants({
        size,
        rounded,
        className,
      })}
    />
  );
};
