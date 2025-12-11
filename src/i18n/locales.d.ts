type Locales = typeof import("./locales/en.json");

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
declare interface IntlLocales extends Locales {}
