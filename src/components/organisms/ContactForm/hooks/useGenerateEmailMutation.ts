import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/atoms/Toaster/hooks/useToast";
import { type GenerateMessageProps } from "@/schemas/generateMessage/schema";

export const useGenerateEmailMutation = () => {
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
