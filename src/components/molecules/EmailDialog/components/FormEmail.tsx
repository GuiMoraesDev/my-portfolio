"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ComponentProps, useState } from "react";
import { useForm } from "react-hook-form";

import { useSendEmail } from "../hooks/useSendEmail";

import { Dialog } from "@/components/atoms/Dialog";
import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Textarea } from "@/components/atoms/TextArea";
import { SendEmailProps, emailSchema } from "@/schemas/emailSchema";

export const FormEmail = (props: ComponentProps<"form">) => {
  const [isOpened, setIsOpened] = useState(false);
  const t = useTranslations("contact");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendEmailProps>({
    resolver: zodResolver(emailSchema),
  });

  const { mutateAsync, isPending } = useSendEmail();

  const onSubmit = async (values: SendEmailProps) => {
    await mutateAsync(values);
    setIsOpened(false);
  };

  return (
    <Dialog.Root open={isOpened} onOpenChange={setIsOpened}>
      <Dialog.Trigger className="flex size-20 items-center justify-center rounded-md border p-4 transition hover:bg-white/[0.3]">
        <Icon icon="Mail" size="lg" />
      </Dialog.Trigger>

      <Dialog.Content className="flex flex-col gap-4 md:gap-8">
        <Dialog.Header>
          <Dialog.Title>{t("title")}</Dialog.Title>
          <Dialog.Description>{t("subtitle")}</Dialog.Description>
        </Dialog.Header>

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
              rows={3}
              {...register("message")}
            />
            <ErrorMessage hasError={!!errors.message}>
              {errors.message?.message}
            </ErrorMessage>
          </Label>
        </form>

        <Dialog.Footer className="gap-2 sm:justify-between">
          <Dialog.Close className="rounded-md border border-plum-800 px-4 py-2 transition hover:bg-plum-500 hover:text-white">
            {t("buttons.close")}
          </Dialog.Close>

          <button
            type="submit"
            form="email-form"
            disabled={isPending}
            className="rounded-md border border-plum-800 bg-plum-500 px-4 py-2 text-white transition hover:bg-plum-800 disabled:bg-gray-500"
          >
            {t("buttons.send")}
          </button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
