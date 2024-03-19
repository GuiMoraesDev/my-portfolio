import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { ProfileImageComponent } from "./ProfileImage";

export const ProfileImage = () => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, "presentation")}>
      <ProfileImageComponent />
    </NextIntlClientProvider>
  );
};
