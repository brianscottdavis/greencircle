import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "hi", "zh", "fr", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
