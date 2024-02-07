import { Html, Head, Container, Text } from "@react-email/components";

import { SendEmailProps } from "@/schemas/emailSchema";

export const ContactEmailTemplate = ({
  first_name,
  last_name,
  email,
  subject,
  message,
}: Readonly<SendEmailProps>) => {
  return (
    <Html>
      <Head>
        <title>{subject}</title>
      </Head>

      <Container>
        <Text>
          Hi, my name is {first_name} {last_name}.
        </Text>

        <Text>You can contact me by {email}.</Text>

        <Text>I want to talk about {subject}</Text>
        <Text>{message}</Text>
      </Container>
    </Html>
  );
};
