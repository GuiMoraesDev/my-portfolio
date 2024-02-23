import { z } from "zod";

export const emailSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "First name is required")
    .min(2, "First name should have at least 2 characters")
    .max(50),
  last_name: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .min(2, "Last name should have at least 2 characters")
    .max(50),
  email: z.string().email(),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .min(2, "Subject should have at least 2 characters")
    .max(100),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .min(2, "Message should have at least 2 characters"),
});
export type SendEmailProps = z.infer<typeof emailSchema>;
