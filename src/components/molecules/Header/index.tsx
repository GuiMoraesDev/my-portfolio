import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Suspense } from "react";

import { HeaderComponent, LanguageSelectorElement, Wrapper } from "./Header";
import { Hamburger } from "./icons/hamburger";

const Skeleton = () => (
  <Wrapper id="header">
    <span className="flex animate-pulse cursor-not-allowed items-center rounded-sm bg-plum-900/5 opacity-10">
      <Hamburger />
    </span>

    <span className="flex animate-pulse cursor-not-allowed items-center rounded-sm bg-plum-900/5 opacity-10">
      <LanguageSelectorElement disabled />
    </span>
  </Wrapper>
);

export const Header = () => {
  const messages = useMessages();

  return (
    <Suspense fallback={<Skeleton />}>
      <NextIntlClientProvider messages={pick(messages, "links")}>
        <HeaderComponent id="header" />
      </NextIntlClientProvider>
    </Suspense>
  );
};
