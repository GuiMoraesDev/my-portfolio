import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { ReposComponent } from "./Repos";

export const Repos = () => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, "projects")}>
      <ReposComponent />
    </NextIntlClientProvider>
  );
};
