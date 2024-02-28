import { type NextRequest, NextResponse } from "next/server";

import { emailSchema } from "@/schemas/email/schema";
import email from "@/services/email";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    await emailSchema.parseAsync(data);

    await email.send(data);

    return new NextResponse(null, {
      status: 200,
      headers: { "content-type": "application/json" },
      statusText: "Email sent",
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return NextResponse.error();
  }
}
