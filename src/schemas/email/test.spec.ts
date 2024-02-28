import { describe, expect, it } from "@jest/globals";

import { emailSchema } from "./schema";

describe.only("EmailSchema", () => {
  it("should return false if first_name field are not fill", async () => {
    const data = {
      first_name: "",
      last_name: "Doe",
      email: "johnDoe@example.com",
      subject: "Hello",
      message: "Hello, John Doe!",
    };

    const valid = emailSchema.safeParse(data);

    expect(valid.success).toEqual(false);
  });

  it("should return false if last_name field are not fill", async () => {
    const data = {
      first_name: "John",
      last_name: "",
      email: "johnDoe@example.com",
      subject: "Hello",
      message: "Hello, John Doe!",
    };

    const valid = emailSchema.safeParse(data);

    expect(valid.success).toEqual(false);
  });

  it("should return false if email field are not fill", async () => {
    const data = {
      first_name: "John",
      last_name: "Doe",
      email: "",
      subject: "Hello",
      message: "Hello, John Doe!",
    };

    const valid = emailSchema.safeParse(data);

    expect(valid.success).toEqual(false);
  });

  it("should return false if subject field are not fill", async () => {
    const data = {
      first_name: "John",
      last_name: "Doe",
      email: "johnDoe@example.com",
      subject: "",
      message: "Hello, John Doe!",
    };

    const valid = emailSchema.safeParse(data);

    expect(valid.success).toEqual(false);
  });

  it("should return false if message field are not fill", async () => {
    const data = {
      first_name: "John",
      last_name: "Doe",
      email: "johnDoe@example.com",
      subject: "Hello",
      message: "",
    };

    const valid = emailSchema.safeParse(data);

    expect(valid.success).toEqual(false);
  });

  it("should return true if fields are fill", async () => {
    const data = {
      first_name: "John",
      last_name: "Doe",
      email: "johnDoe@example.com",
      subject: "Hello",
      message: "Hello, John Doe!",
    };

    const valid = emailSchema.safeParse(data);

    expect(valid.success).toEqual(true);
  });

  it("should return true if message field are a HTML string", async () => {
    const data = {
      first_name: "John",
      last_name: "Doe",
      email: "johnDoe@example.com",
      subject: "Hello",
      message: "<p>Hello, John Doe!</p>",
    };

    const valid = emailSchema.safeParse(data);

    expect(valid.success).toEqual(true);
  });
});
