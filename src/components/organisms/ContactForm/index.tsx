"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useId } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

import { Action } from "./components/ActionButton";
import { useSpeech } from "./hooks/useSpeech";

import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Textarea } from "@/components/atoms/TextArea";
import { useToast } from "@/components/atoms/Toaster/hooks/useToast";
import { Tooltip } from "@/components/atoms/Tooltip";
import { SendEmailProps, emailSchema } from "@/schemas/emailSchema";
import { GenerateMessageProps } from "@/schemas/generateMessageSchema";

const useSendEmail = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["send-email"],
    mutationFn: async (props: SendEmailProps) =>
      fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      }),
    onMutate: () => {
      toast({
        title: "Sending email",
        description: "Please wait",
        variant: "info",
      });
    },
    onError: (error) => {
      toast({
        title: "Something is wrong",
        description: "Please try again later",
        variant: "error",
      });

      // eslint-disable-next-line no-console
      console.error(error);
    },
    onSuccess: () => {
      toast({
        title: "Email sent",
        description: "I will get back to you as soon as possible",
        variant: "success",
      });
    },
  });
};

const useEmailForm = () =>
  useForm<SendEmailProps>({
    resolver: zodResolver(emailSchema),
  });

export const ContactForm = () => {
  const formId = useId();

  const t = useTranslations("contact");
  const formMethods = useEmailForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const { mutateAsync, isPending } = useSendEmail();

  const onFormSubmit = async (values: SendEmailProps) => {
    await mutateAsync(values);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <form
        className="flex w-full flex-col gap-4"
        id={formId}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <Label className="mx-auto flex w-4/5 flex-col items-baseline justify-between gap-2">
          {t("form.labels.first_name")}
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

        <Label className="mx-auto flex w-4/5 flex-col items-baseline justify-between gap-2">
          {t("form.labels.last_name")}
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

        <Label className="mx-auto flex w-4/5 flex-col items-baseline justify-between gap-2">
          {t("form.labels.email")}
          <Input
            type="email"
            id="email"
            placeholder={t("form.placeholders.email")}
            autoComplete="email"
            {...register("email")}
          />
          <ErrorMessage hasError={!!errors.email}>
            {errors.email?.message}
          </ErrorMessage>
        </Label>

        <Label className="mx-auto flex w-4/5 flex-col items-baseline justify-between gap-2">
          {t("form.labels.subject")}
          <Input
            type="text"
            id="subject"
            placeholder={t("form.placeholders.subject")}
            {...register("subject")}
          />
          <ErrorMessage hasError={!!errors.subject}>
            {errors.subject?.message}
          </ErrorMessage>
        </Label>

        <Label className="mx-auto flex w-4/5 flex-1 flex-col items-baseline justify-between gap-2">
          {t("form.labels.message")}
          <section className="relative flex h-full w-full gap-2">
            <Textarea
              id="message"
              placeholder={t("form.placeholders.message")}
              rows={4}
              {...register("message")}
            />

            <div className="absolute right-0 flex translate-x-full flex-col gap-4 p-2">
              <RecordButton {...formMethods} />
              <GenerateButton {...formMethods} />
            </div>
          </section>
          <ErrorMessage hasError={!!errors.message}>
            {errors.message?.message}
          </ErrorMessage>
        </Label>
      </form>

      <section className="flex w-full items-center justify-end">
        <button
          type="submit"
          form={formId}
          disabled={isPending}
          className="flex w-28 items-center justify-center gap-2 rounded-md border border-plum-800 bg-white px-4 py-2 text-plum-900 transition hover:bg-white/80 disabled:bg-gray-500"
        >
          {t("form.buttons.send")}
          <Icon size="sm" icon="PaperPlane" className="lg:size-4" />
        </button>
      </section>
    </div>
  );
};

type ActionButtonProps = UseFormReturn<SendEmailProps>;

const RecordButton = ({ setValue }: ActionButtonProps) => {
  const locale = useLocale();
  const { isDisabled, isRecording, onStartRecording, onStopRecording } =
    useSpeech({ locale, callback: setValue });

  return (
    <Action.Button
      disabled={isDisabled}
      isActive={isRecording}
      onClick={isRecording ? onStopRecording : onStartRecording}
    >
      <Action.Icon icon={isRecording ? "MicrophoneSlash" : "Microphone"} />
      <Action.Label
        isActive={isRecording}
        activeLabel="Stop recording"
        inactiveLabel="Start recording"
      />
    </Action.Button>
  );
};

const useGenerateEmail = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["generate-email"],
    mutationFn: async (props: GenerateMessageProps) =>
      fetch("/api/generate_message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      }),
    onMutate: () => {
      toast({
        title: "Generating message",
        description: "Please wait",
        variant: "info",
      });
    },
    onError: (error) => {
      toast({
        title: "Something is wrong",
        description: "Please try again later",
        variant: "error",
      });

      // eslint-disable-next-line no-console
      console.error(error);
    },
    onSuccess: () => {
      toast({
        title: "Email sent",
        description: "I will get back to you as soon as possible",
        variant: "success",
      });
    },
  });
};

const GenerateButton = ({
  getValues,
  setValue,
  trigger,
  watch,
}: ActionButtonProps) => {
  const locale = useLocale();
  const { isPending, mutateAsync } = useGenerateEmail();
  const [firstNameValue, lastNameValue, subjectValue] = watch([
    "first_name",
    "last_name",
    "subject",
  ]);

  const isFormFilled =
    firstNameValue?.length > 0 &&
    lastNameValue?.length > 0 &&
    subjectValue?.length > 0;

  const handleSubmit = async () => {
    await trigger?.(["first_name", "last_name", "subject"]);

    if (!isFormFilled) return;

    const values = getValues();
    const response = await mutateAsync({ locale, ...values });
    const data = await response.json();
    setValue("message", data);
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Action.Button
            isActive={isPending}
            disabled={!isFormFilled}
            onClick={handleSubmit}
          >
            <Action.Icon
              icon="MagicWand"
              className={isPending ? "[&_path]:fill-black" : ""}
            />
            <Action.Label
              isActive={isPending}
              activeLabel="Generating..."
              inactiveLabel="Generate with AI"
            />
          </Action.Button>
        </Tooltip.Trigger>

        <Tooltip.Content className={isFormFilled ? "hidden" : ""}>
          Fill the form to generate a message with AI
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
