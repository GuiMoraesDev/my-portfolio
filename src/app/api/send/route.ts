import { Resend } from "resend";
import { z } from "zod";

import { ContactEmailTemplate } from "@/components/molecules/EmailDialog/templates/contact";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

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
    .min(2, "Message should have at least 2 characters")
    .max(1000),
});
export type SendEmailProps = z.infer<typeof emailSchema>;

export async function POST(request: Request) {
  try {
    const req = await request.json();

    await emailSchema.parseAsync(req);

    const { first_name, last_name, email, subject, message } =
      req as SendEmailProps;

    const data = await resend.emails.send({
      from: "No answer <no-answer@guimoraes.dev>",
      to: ["guimoraes.dev@gmail.com", "delivered@resend.dev"],
      subject,
      react: ContactEmailTemplate({
        first_name,
        last_name,
        email,
        subject,
        message,
      }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
