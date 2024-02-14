"use client";

import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { Icon, IconProps } from "@/components/atoms/Icon";

type ActionProps = {
  isActive: boolean;
};

type ActionButtonProps = ComponentProps<"button"> & ActionProps;

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ isActive, className, ...props }, ref) => (
    <button
      type="button"
      className={twMerge([
        "group inline-flex h-8 w-8 origin-right items-center justify-center rounded-full border border-white/80 p-1 transition-[width] hover:w-36 hover:gap-2 disabled:cursor-not-allowed disabled:bg-gray-500",
        isActive ? "bg-white text-black" : "bg-plum-500 text-white",
        className,
      ])}
      {...props}
      ref={ref}
    />
  ),
);
ActionButton.displayName = "ActionButton";

const ActionIcon = ({ className, ...props }: IconProps) => (
  <Icon size="sm" className={twMerge("lg:size-4", className)} {...props} />
);

type ActionLabelProps = ComponentProps<"p"> &
  ActionProps & {
    activeLabel: string;
    inactiveLabel: string;
  };

const ActionLabel = ({
  isActive,
  activeLabel,
  inactiveLabel,
}: ActionLabelProps) => (
  <p className="w-0 origin-right scale-x-0 truncate text-xs leading-normal transition-all delay-75 group-hover:inline-flex group-hover:w-2/3 group-hover:scale-x-100">
    {isActive ? activeLabel : inactiveLabel}
  </p>
);

export const Action = {
  Button: ActionButton,
  Icon: ActionIcon,
  Label: ActionLabel,
};
