"use client";

import { useLocale } from "next-intl";
import { usePathname } from "~/i18n/navigation";
import { routing } from "~/i18n/routing";
import { useTransition } from "react";
import { useRouter } from "~/i18n/navigation";
import { Button } from "~/components/ui/button";

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  hi: "हिन्दी",
  zh: "中文",
  fr: "Français",
  es: "Español",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onLocaleChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <Button
          key={loc}
          variant={locale === loc ? "secondary" : "ghost"}
          size="sm"
          className="text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900"
          onClick={() => onLocaleChange(loc)}
          disabled={isPending}
        >
          {LOCALE_NAMES[loc] ?? loc}
        </Button>
      ))}
    </div>
  );
}
