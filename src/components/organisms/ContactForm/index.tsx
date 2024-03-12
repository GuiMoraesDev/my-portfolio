import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { ContactFormComponent } from "./ContactForm";

export const ContactForm = () => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, "contact")}>
      <ContactFormComponent />
    </NextIntlClientProvider>
  );
};
