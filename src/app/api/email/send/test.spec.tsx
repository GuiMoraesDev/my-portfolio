import { describe, expect, it, jest } from "@jest/globals";
import { type NextRequest } from "next/server";

import { POST } from "./route";

import email from "@/lib/email";

describe("Send Email", () => {
  it("should send an email", async () => {
    const mockedSendEmail = jest
      .spyOn(email, "send")
      .mockReturnValue(Promise.resolve());

    const req = {
      json: () =>
        new Promise((resolve) => {
          resolve({
            first_name: "John",
            last_name: "Doe",
            email: "johnDoe@example.com",
            subject: "Testing",
            message: "This is a test message.",
          });
        }),
    };

    const response = await POST(req as unknown as NextRequest);

    expect(mockedSendEmail).toHaveBeenCalledTimes(1);
    expect(response.status).toEqual(200);
  });
});
