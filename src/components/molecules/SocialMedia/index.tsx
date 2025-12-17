import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { type ComponentProps } from "react";

import { SocialMediaComponent } from "./SocialMedia";

export const SocialMedia = (props: ComponentProps<"div">) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, "home")}>
      <SocialMediaComponent {...props} />
    </NextIntlClientProvider>
  );
};
