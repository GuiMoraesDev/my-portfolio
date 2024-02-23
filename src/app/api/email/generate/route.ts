import OpenAI from "openai";

import {
  generateMessageSchema,
  type GenerateMessageProps,
} from "@/schemas/generateMessageSchema";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const req = await request.json();

    await generateMessageSchema.parseAsync(req);

    const { first_name, last_name, subject, message, locale } =
      req as GenerateMessageProps;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `I'm ${first_name} ${last_name}. Create a pleasant message about ${subject} to Guilherme Moraes in no more than 50 tokens. Base your answer in it ${message}, and write it in ${locale} language`,
        },
      ],
    });

    return Response.json(chatCompletion.choices[0].message.content);
  } catch (error) {
    return Response.json({ error });
  }
}
