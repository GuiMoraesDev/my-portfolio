"use client";

import { startSpan } from "@sentry/nextjs";
import Placeholder from "@tiptap/extension-placeholder";
import UnderlineMark from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useTranslations } from "next-intl";
import { useId } from "react";

import { EmailRenderPreview } from "./components/EmailRenderPreview";
import { MarkdownEditor } from "./components/MarkdownEditor";
import { useEmailForm, useSendEmailMutation } from "./hooks";

import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { type SendEmailProps } from "@/schemas/email/schema";

export const ContactForm = () => {
  const formId = useId();

  const t = useTranslations("contact");
  const formMethods = useEmailForm();
  const {
    reset,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = formMethods;

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineMark,
      Placeholder.configure({
        placeholder: "Type your message here...",
      }),
    ],
    onUpdate({ editor }) {
      setValue("message", editor.getHTML());
    },
  });

  const { mutateAsync, isPending } = useSendEmailMutation();

  const onFormSubmit = async (values: SendEmailProps) => {
    startSpan(
      {
        name: "Submit form span",
        attributes: {
          ...values,
        },
      },
      async () => {
        const response = await mutateAsync(values);

        if (!response.ok) {
          throw new Error("Error on form mutation");
        }
      },
    );
    reset();
  };

  const isLoading = isPending || !editor;

  return (
    <div className="flex w-full items-center justify-center gap-8">
      <div className="flex w-auto max-w-full flex-1 flex-col items-center justify-center gap-8">
        <strong className="w-full text-lg">{t("form.title")}</strong>

        <form
          className="flex w-full flex-col gap-4"
          data-testid="contact-form"
          id={formId}
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Label className="mx-auto flex w-full flex-col items-baseline justify-between gap-2">
            {t("form.labels.first_name")}
            <Input
              type="text"
              id="first_name"
              placeholder="John"
              isLoading={isLoading}
              autoComplete="given-name"
              {...register("first_name")}
            />
            <ErrorMessage hasError={!!errors.first_name}>
              {errors.first_name?.message}
            </ErrorMessage>
          </Label>

          <Label className="mx-auto flex w-full flex-col items-baseline justify-between gap-2">
            {t("form.labels.last_name")}
            <Input
              type="text"
              id="last_name"
              isLoading={isLoading}
              placeholder="Doe"
              autoComplete="family-name"
              {...register("last_name")}
            />
            <ErrorMessage hasError={!!errors.last_name}>
              {errors.last_name?.message}
            </ErrorMessage>
          </Label>

          <Label className="mx-auto flex w-full flex-col items-baseline justify-between gap-2">
            {t("form.labels.email")}
            <Input
              type="email"
              id="email"
              isLoading={isLoading}
              placeholder={t("form.placeholders.email")}
              autoComplete="email"
              {...register("email")}
            />
            <ErrorMessage hasError={!!errors.email}>
              {errors.email?.message}
            </ErrorMessage>
          </Label>

          <Label className="mx-auto flex w-full flex-col items-baseline justify-between gap-2">
            {t("form.labels.subject")}
            <Input
              type="text"
              id="subject"
              isLoading={isLoading}
              placeholder={t("form.placeholders.subject")}
              {...register("subject")}
            />
            <ErrorMessage hasError={!!errors.subject}>
              {errors.subject?.message}
            </ErrorMessage>
          </Label>

          <Label className="mx-auto flex w-full flex-1 flex-col items-baseline justify-between gap-2">
            <p>
              {t.rich("form.labels.message", {
                small: (chunks) => <small>{chunks}</small>,
              })}
            </p>

            {isLoading ? (
              <div className="flex h-32 w-full animate-pulse rounded-md border border-gray-300 bg-gray-200" />
            ) : (
              <MarkdownEditor editor={editor} {...formMethods} />
            )}

            <ErrorMessage hasError={!!errors.message}>
              {errors.message?.message}
            </ErrorMessage>
          </Label>
        </form>

        <section className="flex w-full items-center justify-center lg:justify-end">
          <button
            type="submit"
            form={formId}
            disabled={isLoading}
            className="flex w-28 items-center justify-center gap-2 rounded-md border border-plum-800 bg-white px-4 py-2 text-plum-900 transition hover:bg-white/80 disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            {t("form.buttons.send")}
            <Icon size="sm" icon="PaperPlane" className="lg:size-4" />
          </button>
        </section>
      </div>

      <div className="hidden h-full w-fit min-w-72 flex-1 flex-col items-start gap-8 transition md:flex">
        <strong className="text-lg">{t("preview.title")}</strong>

        <EmailRenderPreview {...formMethods} />
      </div>
    </div>
  );
};
