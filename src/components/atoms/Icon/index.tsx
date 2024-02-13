import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";

import "./styles.css";
import { icons } from "./icons";

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

export type IconProps = ComponentProps<"span"> &
  VariantProps<typeof iconVariants> & {
    icon: keyof typeof icons;
  };

export const Icon = ({
  size,
  icon,
  rounded,
  className,
  ...props
}: IconProps) => {
  const IconComponent = icons[icon];
  return (
    <span
      className={iconVariants({
        size,
        rounded,
        className,
      })}
      {...props}
    >
      <IconComponent />
    </span>
  );
};
