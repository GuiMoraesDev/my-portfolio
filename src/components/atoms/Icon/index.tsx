import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";

import "./styles.css";
import { icons } from "./icons";

const iconVariants = tv({
  base: "inline-flex items-center justify-center",
  variants: {
    size: {
      sm: "size-5 md:size-6 lg:size-7",
      md: "size-6 md:size-7 lg:size-8",
      lg: "size-7 md:size-8 lg:size-9",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type IconProps = ComponentProps<"span"> &
  VariantProps<typeof iconVariants> & {
    icon: keyof typeof icons;
  };

export const Icon = ({
  size,
  icon,
  className,
  children,
  ...props
}: IconProps) => {
  const IconComponent = icons[icon];
  return (
    <span
      className={iconVariants({
        size,
        className,
      })}
      {...props}
    >
      <IconComponent />
    </span>
  );
};
