"use client";

import { useMutation } from "@tanstack/react-query";

export const useSendEmail = () => {
  return useMutation({
    mutationKey: ["send-email"],
    mutationFn: () =>
      fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
  });
};
