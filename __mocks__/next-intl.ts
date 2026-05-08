import enMessages from "../src/i18n/locales/en.json";

type AnyObj = Record<string, unknown>;

function resolveKey(obj: AnyObj, key: string): string {
  const parts = key.split(".");
  let cur: unknown = obj;
  for (const part of parts) {
    if (cur === null || typeof cur !== "object") return key;
    cur = (cur as AnyObj)[part];
  }
  return typeof cur === "string" ? cur : key;
}

export const useTranslations = (namespace: string) => {
  const ns = ((enMessages as AnyObj)[namespace] as AnyObj) ?? {};
  return (key: string, params?: Record<string, string | number>) => {
    let value = resolveKey(ns, key);
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replaceAll(`{${k}}`, String(v));
      }
    }
    return value;
  };
};
