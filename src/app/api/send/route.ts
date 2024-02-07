import { Resend } from "resend";

import { EmailTemplate } from "@/components/molecules/EmailDialog/templates/helloWorld";

const { RESEND_API_KEY } = process.env;
const resend = new Resend(RESEND_API_KEY);

export type SendEmailProps = {
  name: string;
  email?: string;
};

export async function POST(request: Request) {
  const req = (await request.json()) as SendEmailProps;
  const { name, email = "delivered@resend.dev" } = req;

  try {
    const data = await resend.emails.send({
      from: "No answer <no-answer@guimoraes.dev>",
      to: email,
      subject: `Hello, ${name}`,
      react: EmailTemplate({ firstName: name }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
