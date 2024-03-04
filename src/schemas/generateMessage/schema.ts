import { z } from "zod";

import { type Locale } from "@/i18n/locales";

export const generateMessageSchema = z.object({
  first_name: z.string().trim().min(1, "first_name_required").max(50),
  last_name: z.string().trim().min(1, "last_name_required").max(50),
  subject: z.string().trim().min(1, "subject_required").max(100),
  message: z.string().trim().optional(),
});
export type GenerateMessageProps = z.infer<typeof generateMessageSchema> & {
  locale: Locale;
};
