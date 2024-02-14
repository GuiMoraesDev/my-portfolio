import { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { Locale } from "./i18n/locales";
import { locales, defaultLocale } from "./i18n/settings";

export default async function middleware(request: NextRequest) {
  const headerLocale =
    (request.headers.get("x-your-custom-locale") as Locale) || defaultLocale;

  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale: headerLocale,
    localePrefix: "never",
  });
  const response = handleI18nRouting(request);

  response.headers.set("x-your-custom-locale", defaultLocale);

  return response;
}

export const config = {
  matcher: ["/", "/(en|pt)/:path*"],
};
