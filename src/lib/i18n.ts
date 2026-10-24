export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];
export type Localized<T> = Record<Locale, T>;
export const defaultLocale: Locale = "ru";
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
export function localizedPath(locale: Locale, path = ""): string {
  return `/${locale}${path}/`.replace(/\/+/g, "/");
}
