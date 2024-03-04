import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { useToast } from "@/components/atoms/Toaster/hooks/useToast";
import { type GenerateMessageProps } from "@/schemas/generateMessage/schema";

export const useGenerateEmailMutation = () => {
  const t = useTranslations("contact");

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["generate-email"],
    mutationFn: async (props: GenerateMessageProps) =>
      fetch("/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      }),

    onMutate: () => {
      toast({
        title: t("form.toasts.generate-email.mutation.title"),
        description: t("form.toasts.generate-email.mutation.message"),
        variant: "info",
      });
    },
    onError: (error) => {
      toast({
        title: t("form.toasts.generate-email.error.title"),
        description: t("form.toasts.generate-email.error.message"),
        variant: "error",
      });

      // eslint-disable-next-line no-console
      console.error(error);
    },
    onSuccess: () => {
      toast({
        title: t("form.toasts.generate-email.success.title"),
        description: t("form.toasts.generate-email.success.message"),
        variant: "success",
      });
    },
  });
};
