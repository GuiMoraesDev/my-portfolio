"use client";

import { useMutation } from "@tanstack/react-query";

import { SendEmailProps } from "@/app/api/send/route";

const sendEmail = async (props: SendEmailProps) =>
  fetch("/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });

export const useSendEmail = () => {
  return useMutation({
    mutationKey: ["send-email"],
    mutationFn: sendEmail,
  });
};
