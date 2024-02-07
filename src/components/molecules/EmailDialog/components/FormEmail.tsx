"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useSendEmail } from "../hooks/useSendEmail";

import { emailSchema, SendEmailProps } from "@/app/api/send/route";
import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Textarea } from "@/components/atoms/TextArea";

export const FormEmail = (props: ComponentProps<"form">) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendEmailProps>({
    resolver: zodResolver(emailSchema),
  });

  const { mutate } = useSendEmail();

  const onSubmit = async (values: SendEmailProps) => {
    console.log(values);
    return mutate(values);
  };

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
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

      <Label className="flex flex-col items-baseline justify-between gap-2">
        Message:
        <Textarea
          id="message"
          placeholder="Type your message here"
          rows={6}
          {...register("message")}
        />
        <ErrorMessage hasError={!!errors.message}>
          {errors.message?.message}
        </ErrorMessage>
      </Label>
    </form>
  );
};
