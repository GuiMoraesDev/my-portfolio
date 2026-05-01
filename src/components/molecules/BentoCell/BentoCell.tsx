import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type BentoCellHeadingProps = ComponentProps<"h3"> & { size?: "lg" | "md" };

const Wrapper = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={twMerge(
      "flex flex-col gap-3 p-8 md:p-10",

      className,
    )}
    {...props}
  />
);

const Label = ({ className, ...props }: ComponentProps<"p">) => (
  <p
    className={twMerge(
      "text-xs font-medium tracking-widest text-accent-500 uppercase",
      className,
    )}
    {...props}
  />
);

const Heading = ({
  size = "md",
  className,
  ...props
}: BentoCellHeadingProps) => (
  <h3
    className={twMerge(
      "font-title font-bold tracking-tight text-text-primary",
      size === "lg" ? "text-headline" : "text-xl",
      className,
    )}
    {...props}
  />
);

const Body = ({ className, ...props }: ComponentProps<"p">) => (
  <p
    className={twMerge(
      "text-body-lg leading-relaxed tracking-wide text-text-secondary",
      className,
    )}
    {...props}
  />
);

export const BentoCell = {
  Wrapper,
  Label,
  Heading,
  Body,
};
