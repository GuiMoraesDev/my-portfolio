import { z } from "zod";

import { type Locale } from "@/i18n/locales";

export const generateMessageSchema = z.object({
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
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .min(2, "Subject should have at least 2 characters")
    .max(100),
  message: z.string().trim().optional(),
});
export type GenerateMessageProps = z.infer<typeof generateMessageSchema> & {
  locale: Locale;
};
