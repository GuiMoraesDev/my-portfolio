"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const labelVariants = tv({
  base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
});

type LabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>;

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={labelVariants({ className })}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;
