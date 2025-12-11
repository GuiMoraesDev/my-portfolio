import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value || "en";

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return notFound();
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
