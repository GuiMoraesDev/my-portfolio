import { pick } from "lodash";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

import { FormEmail } from "./components/FormEmail";

export const EmailDialog = () => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, "contact")}>
      <FormEmail className="flex flex-col gap-4" id="email-form" />
    </NextIntlClientProvider>
  );
};
