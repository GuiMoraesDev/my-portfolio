import { z } from "zod";

export const emailSchema = z.object({
  first_name: z.string().trim().min(1, "first_name_required").max(50),
  last_name: z.string().trim().min(1, "last_name_required").max(50),
  email: z.string().email("email_invalid"),
  subject: z.string().trim().min(1, "subject_required").max(100),
  message: z.string().trim().min(1, "message_required"),
});
export type SendEmailProps = z.infer<typeof emailSchema>;
