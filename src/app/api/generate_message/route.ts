import OpenAI from "openai";

import {
  generateMessageSchema,
  GenerateMessageProps,
} from "@/schemas/generateMessageSchema";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const req = await request.json();

    await generateMessageSchema.parseAsync(req);

    const { first_name, last_name, subject, message } =
      req as GenerateMessageProps;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `I'm ${first_name} ${last_name}.` },
        {
          role: "user",
          content: `Create an email body about ${subject} to Guilherme Moraes in no more than 50 tokens`,
        },
        { role: "user", content: `That's what I have by now ${message}` },
      ],
    });

    return Response.json(chatCompletion.choices[0].message.content);
  } catch (error) {
    return Response.json({ error });
  }
}
