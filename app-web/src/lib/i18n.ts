import { routing } from "~/i18n/routing";

/** Build a locale-prefixed path for use in redirects, callbacks, etc. */
export function getLocalePath(path: string, locale: string): string {
  const prefix =
    locale === routing.defaultLocale && routing.localePrefix === "as-needed"
      ? ""
      : `/${locale}`;
  return `${prefix}${path.startsWith("/") ? path : `/${path}`}`;
}
