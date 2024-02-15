"use client";

import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { Icon, IconProps } from "@/components/atoms/Icon";

type ActionProps = ComponentProps<"div"> & {
  isActive: boolean;
  label: string;
  inactiveLabel?: string;
};

const ActionRoot = forwardRef<HTMLDivElement, ActionProps>(
  ({ children, isActive, label, inactiveLabel, className, ...props }, ref) => (
    <div
      className={twMerge(
        "group box-content inline-flex h-8 w-8 origin-right items-center justify-start rounded-full border border-white/80 transition-[width] hover:w-36",
        isActive ? "bg-white text-black" : "bg-plum-500 text-white",
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
      <p
        className={twMerge(
          "w-0 origin-right truncate text-xs transition-all",
          "group-hover:w-2/3 group-hover:pl-2",
        )}
      >
        {isActive ? label : inactiveLabel}
      </p>
    </div>
  ),
);
ActionRoot.displayName = "ActionRoot";

const ActionButton = ({ className, ...props }: ComponentProps<"button">) => (
  <button
    type="button"
    className={twMerge([
      "block h-8 w-8 rounded-full border border-white/80",
      "disabled:cursor-not-allowed disabled:bg-gray-500",

      className,
    ])}
    {...props}
  />
);

const ActionIcon = ({ className, ...props }: IconProps) => (
  <Icon size="sm" className={twMerge("lg:size-4", className)} {...props} />
);

export const Action = {
  Root: ActionRoot,
  Button: ActionButton,
  Icon: ActionIcon,
};
