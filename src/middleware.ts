import { type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { locales, defaultLocale } from "./i18n/settings";

export default function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  const localeFromHeader = headers.get("x-custom-locale");
  const isHeaderLocaleValid = localeFromHeader && locales.includes(localeFromHeader);

  const selectedLocale = isHeaderLocaleValid ? localeFromHeader : defaultLocale;

  const response = createIntlMiddleware({
    locales,
    defaultLocale: selectedLocale,
    localePrefix: "never",
  })(request);

  response.headers.set("x-custom-locale", defaultLocale);

  response.headers.set("x-current-origin", request.nextUrl.origin);

  return response;
}

export const config = {
  matcher: ["/", "/(en|pt)/:path*"],
};
