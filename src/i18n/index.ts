import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { locales } from "./settings";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get('locale')?.value || 'en';

  if (!locales.includes(locale as any)) {
    return notFound();
  };

  return {
    locale: (await import(`./locales/${locale}.json`)).default,
  };
});
