import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/atoms/Toaster/hooks/useToast";
import { SendEmailProps } from "@/schemas/emailSchema";

export const useSendEmailMutation = () => {
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
