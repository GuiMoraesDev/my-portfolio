"use client";

import { ComponentProps } from "react";

import { useSendEmail } from "../hooks/useSendEmail";

export const SendButton = (props: ComponentProps<"button">) => {
  const { mutate } = useSendEmail();

  return (
    <button
      onClick={() =>
        mutate({
          name: "Guilherme",
        })
      }
      {...props}
    />
  );
};
