import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SendEmailProps, emailSchema } from "@/schemas/emailSchema";

export const useEmailForm = () =>
  useForm<SendEmailProps>({
    resolver: zodResolver(emailSchema),
  });
