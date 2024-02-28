import { describe, expect, it } from "@jest/globals";

import { generateMessageSchema } from "./schema";

describe.only("GenerateMessageSchema", () => {
  it("should return false if first_name field are not fill", async () => {
    const data = {
      first_name: "",
      last_name: "Doe",
      subject: "Hello",
      message: "Hello, John Doe!",
    };

    const valid = generateMessageSchema.safeParse(data);

    expect(valid.success).toEqual(false);
  });

  it("should return false if last_name field are not fill", async () => {
    const data = {
      first_name: "John",
      last_name: "",
      subject: "Hello",
      message: "Hello, John Doe!",
    };

    const valid = generateMessageSchema.safeParse(data);

    expect(valid.success).toEqual(false);
  });

  it("should return false if subject field are not fill", async () => {
    const data = {
      first_name: "John",
      last_name: "Doe",
      subject: "",
      message: "Hello, John Doe!",
    };

    const valid = generateMessageSchema.safeParse(data);

    expect(valid.success).toEqual(false);
  });

  it("should return true if message field are not fill", async () => {
    const data = {
      first_name: "John",
      last_name: "Doe",
      subject: "Hello",
      message: "",
    };

    const valid = generateMessageSchema.safeParse(data);

    expect(valid.success).toEqual(false);
  });

  it("should return true if fields are fill", async () => {
    const data = {
      first_name: "John",
      last_name: "Doe",
      subject: "Hello",
      message: "Hello, John Doe!",
    };

    const valid = generateMessageSchema.safeParse(data);

    expect(valid.success).toEqual(true);
  });

  it("should return true if message field are a HTML string", async () => {
    const data = {
      first_name: "John",
      last_name: "Doe",
      subject: "Hello",
      message: "<p>Hello, John Doe!</p>",
    };

    const valid = generateMessageSchema.safeParse(data);

    expect(valid.success).toEqual(true);
  });
});
