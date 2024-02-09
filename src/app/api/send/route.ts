import { Resend } from "resend";

import { ContactEmailTemplate } from "@/emails/templates/contact";
import { SendEmailProps, emailSchema } from "@/schemas/emailSchema";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

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
