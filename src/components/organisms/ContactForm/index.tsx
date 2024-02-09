"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Textarea } from "@/components/atoms/TextArea";
import { useToast } from "@/components/atoms/Toaster/hooks/useToast";
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

  const { toast } = useToast();

  const locale = useLocale();
  const [isRecording, setIsRecording] = useState(false);

  const t = useTranslations("contact");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useEmailForm();

  const { mutateAsync, isPending } = useSendEmail();

  const isSpeechRecognitionSupported =
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

  const speechRecognition = useMemo(() => {
    if (!isSpeechRecognitionSupported) return null;

    const SpeechRecognitionApi =
      window?.SpeechRecognition || window?.webkitSpeechRecognition;

    const instance = new SpeechRecognitionApi();

    instance.lang = locale;
    instance.continuous = true;
    instance.interimResults = true;
    instance.maxAlternatives = 1;

    instance.onresult = (event) => {
      const speechToText = Array.from(event.results).reduce(
        (text, result) => text.concat(result[0].transcript),
        "",
      );

      setValue("message", speechToText);
    };

    return instance;
  }, [isSpeechRecognitionSupported, locale, setValue]);

  const handleStartRecording = () => {
    if (!speechRecognition) return;

    speechRecognition.start();
    setIsRecording(true);
  };
  const handleStopRecording = () => {
    if (!speechRecognition) return;

    speechRecognition.stop();
    setIsRecording(false);
  };

  const onFormSubmit = async (values: SendEmailProps) => {
    try {
      await mutateAsync(values);

      toast({
        title: "Email sent",
        description: "I will get back to you as soon as possible",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Something is wrong",
        description: "Please try again later",
        variant: "error",
      });

      // eslint-disable-next-line no-console
      console.error(error);
    }
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
          <section className="h-ull relative w-full">
            <Textarea
              id="message"
              placeholder="Type your message here"
              rows={3}
              {...register("message")}
            />

            <div className="absolute bottom-0 right-0 flex gap-4 p-2">
              {isSpeechRecognitionSupported &&
                speechRecognition &&
                (isRecording ? (
                  <button
                    type="button"
                    disabled={!speechRecognition}
                    onClick={handleStopRecording}
                  >
                    Stop
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!speechRecognition}
                    onClick={handleStartRecording}
                  >
                    Rec
                  </button>
                ))}
            </div>
          </section>
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
