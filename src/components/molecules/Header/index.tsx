import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import pick from "lodash/pick";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Suspense } from "react";

import { HeaderComponent, LanguageSelectorElement, Wrapper } from "./Header";

const Skeleton = () => (
  <Wrapper id="header">
    <span className="flex animate-pulse cursor-not-allowed items-center rounded-sm bg-plum-900/5 opacity-10">
      <HamburgerMenuIcon className="h-5 w-5" />
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
