import { type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { type Locale } from "./i18n/locales";
import { locales, defaultLocale } from "./i18n/settings";

export default function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  const headerLocale =
    (headers.get("x-custom-locale") as Locale) || defaultLocale;

  const response = createIntlMiddleware({
    locales,
    defaultLocale: headerLocale,
    localePrefix: "never",
  })(request);

  response.headers.set("x-custom-locale", defaultLocale);

  response.headers.set("x-current-origin", request.nextUrl.origin);

  return response;
}

export const config = {
  matcher: ["/", "/(en|pt)/:path*"],
};
