import { Resend } from "resend";

import { ContactEmailTemplate } from "@/emails/templates/contact";
import { type SendEmailProps } from "@/schemas/email/schema";

const send = async (req: SendEmailProps) => {
  try {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    const { first_name, last_name, email, subject, message } = req;

    await resend.emails.send({
      from: "New contact <no-answer@guimoraes.dev>",
      to:
        process.env.NODE_ENV === "test"
          ? "delivered@resend.dev"
          : "guimoraes.dev@gmail.com",
      subject,
      react: ContactEmailTemplate({
        first_name,
        last_name,
        email,
        subject,
        message,
      }),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};

const Email = {
  send,
};

export default Email;
