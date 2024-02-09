"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Textarea } from "@/components/atoms/TextArea";
import { SendEmailProps, emailSchema } from "@/schemas/emailSchema";

const useSendEmail = () =>
  useMutation({
    mutationKey: ["send-email"],
    mutationFn: async (props: SendEmailProps) =>
      fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      }),
  });

const useEmailForm = () =>
  useForm<SendEmailProps>({
    resolver: zodResolver(emailSchema),
  });

export const ContactForm = () => {
  const formId = useId();

  const t = useTranslations("contact");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useEmailForm();

  const { mutateAsync, isPending } = useSendEmail();

  const onFormSubmit = async (values: SendEmailProps) => {
    return mutateAsync(values);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <form
        className="flex w-full flex-col gap-4"
        id={formId}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <Label className="flex flex-col items-baseline justify-between gap-2">
          Your first name:
          <Input
            type="text"
            id="first_name"
            placeholder="John"
            autoComplete="given-name"
            {...register("first_name")}
          />
          <ErrorMessage hasError={!!errors.first_name}>
            {errors.first_name?.message}
          </ErrorMessage>
        </Label>
        <Label className="flex flex-col items-baseline justify-between gap-2">
          Your last name:
          <Input
            type="text"
            id="last_name"
            placeholder="Doe"
            autoComplete="family-name"
            {...register("last_name")}
          />
          <ErrorMessage hasError={!!errors.last_name}>
            {errors.last_name?.message}
          </ErrorMessage>
        </Label>
        <Label className="flex flex-col items-baseline justify-between gap-2">
          Your best email:
          <Input
            type="email"
            id="email"
            placeholder="johndoe@example.com"
            autoComplete="email"
            {...register("email")}
          />
          <ErrorMessage hasError={!!errors.email}>
            {errors.email?.message}
          </ErrorMessage>
        </Label>

        <Label className="flex flex-col items-baseline justify-between gap-2">
          Subject:
          <Input
            type="text"
            id="subject"
            placeholder="I have a great opportunity for you"
            {...register("subject")}
          />
          <ErrorMessage hasError={!!errors.subject}>
            {errors.subject?.message}
          </ErrorMessage>
        </Label>

        <Label className="flex flex-1 flex-col items-baseline justify-between gap-2">
          Message:
          <Textarea
            id="message"
            placeholder="Type your message here"
            rows={3}
            {...register("message")}
          />
          <ErrorMessage hasError={!!errors.message}>
            {errors.message?.message}
          </ErrorMessage>
        </Label>
      </form>

      <button
        type="submit"
        form={formId}
        disabled={isPending}
        className="w-28 rounded-md border border-plum-800 bg-white px-4 py-2 text-plum-900 transition hover:bg-white/80 disabled:bg-gray-500"
      >
        {t("buttons.send")}
      </button>
    </div>
  );
};
