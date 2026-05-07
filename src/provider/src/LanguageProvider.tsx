import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { type PropsWithChildren } from "react";

const messages = await getMessages();

export const LanguageProvider = async ({ children }: PropsWithChildren) => (
  <NextIntlClientProvider messages={messages}>
    {children}
  </NextIntlClientProvider>
);
