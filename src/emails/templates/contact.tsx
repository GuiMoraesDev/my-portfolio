import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Markdown } from "@react-email/markdown";
import * as React from "react";

import { type SendEmailProps } from "@/schemas/emailSchema";

export const ContactEmailTemplate = ({
  first_name,
  last_name,
  email,
  subject,
  message,
}: Readonly<SendEmailProps>) => (
  <Tailwind>
    <Html>
      <Head />

      <Preview>Hey, you have a new message 📫</Preview>

      <Body className="bg-white font-sans">
        <Container className="mx-auto my-0 px-5 pb-12 pt-6  text-black">
          <Heading className="mt-12 text-3xl font-bold">
            Hey, you have a new message 📫
          </Heading>

          <Section key="title">
            <Text className="text-sm leading-tight">
              My name is{" "}
              <span className="font-semibold">
                {first_name} {last_name}
              </span>
              .
              <br />
              You can contact me by <Link>{email}</Link>
            </Text>
          </Section>

          <Section className="my-1" key="divider">
            <Hr className="bg-gray-400" />
          </Section>

          <Section className="mx-0 my-3 rounded-md px-4 py-3" key="message">
            <Text className="text-xl font-semibold" key="subject">
              {subject}
            </Text>

            <Markdown
              key="message"
              markdownCustomStyles={{
                h1: { color: "red" },
                h2: { color: "blue" },
                codeInline: { background: "grey" },
              }}
              markdownContainerStyles={{
                padding: "4px",
              }}
            >
              {message}
            </Markdown>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

ContactEmailTemplate.PreviewProps = {
  first_name: "John",
  last_name: "Doe",
  email: "johnDoe@example.com",
  subject: "I have an opportunity for you",
  message: "I have a great opportunity for you. Let's talk about it.",
} as SendEmailProps;

export default ContactEmailTemplate;
