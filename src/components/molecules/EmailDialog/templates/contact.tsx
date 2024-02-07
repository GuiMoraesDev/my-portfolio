import { Html, Head, Container, Text } from "@react-email/components";

import { SendEmailProps } from "@/app/api/send/route";

export const ContactEmailTemplate = ({
  first_name,
  last_name,
  subject,
  message,
}: Readonly<Omit<SendEmailProps, "email">>) => {
  return (
    <Html>
      <Head>
        <title>{subject}</title>
      </Head>

      <Container>
        <Text>
          Hi, my name is {first_name} {last_name}
        </Text>

        <Text>I want to talk about {subject}</Text>
        <Text>{message}</Text>
      </Container>
    </Html>
  );
};
