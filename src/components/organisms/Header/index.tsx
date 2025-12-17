import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { HeaderComponent } from "./Header";

export const Header = () => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, "links")}>
      <HeaderComponent id="header" />
    </NextIntlClientProvider>
  );
};
