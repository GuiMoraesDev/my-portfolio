// Use type safe message keys with `next-intl`
type Locales = typeof import("./locales/en.json");
declare interface IntlLocales extends Locales {}
