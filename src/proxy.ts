import { type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default function proxy(request: NextRequest) {
  const response = createIntlMiddleware(routing)(request);

  response.cookies.set("domain-origin", request.nextUrl.origin);

  return response;
}

export const config = {
  matcher: ["/", "/(en)", "/games"],
};
