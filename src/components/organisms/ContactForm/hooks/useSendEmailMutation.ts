import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { useToast } from "@/components/atoms/Toaster/hooks/useToast";
import { type SendEmailProps } from "@/schemas/email/schema";

export const useSendEmailMutation = () => {
  const t = useTranslations("contact");

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["send-email"],
    mutationFn: async (props: SendEmailProps) =>
      fetch("/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      }),
    onMutate: () => {
      toast({
        title: t("form.toasts.send-email.mutation.title"),
        description: t("form.toasts.send-email.mutation.message"),
        variant: "info",
      });
    },
    onError: (error) => {
      toast({
        title: t("form.toasts.send-email.error.title"),
        description: t("form.toasts.send-email.error.message"),
        variant: "error",
      });

      // eslint-disable-next-line no-console
      console.error(error);
    },
    onSuccess: () => {
      toast({
        title: t("form.toasts.send-email.success.title"),
        description: t("form.toasts.send-email.success.message"),
        variant: "success",
      });
    },
  });
};
