// Use type safe message keys with `next-intl`
type Locales = typeof import("./locales/en.json");
export type Locale = Locales[number];
declare interface IntlLocales extends Locales {}
