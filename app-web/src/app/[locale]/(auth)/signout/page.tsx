"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "~/i18n/navigation";
import { getLocalePath } from "~/lib/i18n";

export default function SignOutPage() {
  const locale = useLocale();
  const t = useTranslations("signout");

  useEffect(() => {
    void signOut({ callbackUrl: getLocalePath("/login", locale) });
  }, [locale]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-emerald-700 to-emerald-900 text-white">
      <Link href="/" className="mb-8 transition-opacity hover:opacity-80">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white sm:h-24 sm:w-24">
          <img
            src="/greencircle-vector.svg"
            alt="GreenCircle"
            className="h-12 w-auto sm:h-14"
          />
        </div>
      </Link>
      <p className="mb-8 text-emerald-100">{t("signingOut")}</p>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-400 border-t-white" />
    </div>
  );
}
