"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Link } from "~/i18n/navigation";
import { getLocalePath } from "~/lib/i18n";

export default function LoginForm() {
  const t = useTranslations("login");
  const searchParams = useSearchParams();
  const locale = useLocale();
  const nextAuthError = searchParams.get("error");

  function getErrorMessage(code: string): string {
    switch (code) {
      case "CredentialsSignin":
        return t("errorCredentials");
      case "AccessDenied":
        return t("errorAccessDenied");
      case "Verification":
        return t("errorVerification");
      case "Configuration":
        return t("errorConfig");
      default:
        return t("errorDefault");
    }
  }

  const initialError = nextAuthError ? getErrorMessage(nextAuthError) : null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const rawCallback = searchParams.get("callbackUrl");
  const callbackUrl =
    rawCallback && rawCallback !== "/" && rawCallback !== "undefined"
      ? decodeURIComponent(rawCallback)
      : getLocalePath("/auth/redirect", locale);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (!res) {
      setError(t("errorUnexpected"));
      setLoading(false);
      return;
    }

    if (!res.ok || res.error) {
      setError(getErrorMessage(res.error ?? "Default"));
    } else {
      window.location.href = callbackUrl;
    }

    setLoading(false);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-6 flex justify-center transition-opacity hover:opacity-80">
          <span className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-emerald-800">Green</span>
            <span className="text-lime-600">Circle</span>
          </span>
        </Link>
        <p className="mb-6 text-center text-emerald-700">{t("prompt")}</p>

        {(error ?? initialError) && (
          <div className="mb-4 text-center text-red-600">{error ?? initialError}</div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-emerald-200 bg-white p-6 shadow-lg"
        >
          <div className="mb-6">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-emerald-900">
              {t("email")}
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              placeholder={t("placeholderEmail")}
              className="bg-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-emerald-900">
              {t("password")}
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="bg-white"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-600"
          >
            {loading ? t("loggingIn") : t("logIn")}
          </Button>

          <p className="mt-4 text-center text-sm text-emerald-600">
            <Link href="/" className="hover:underline">
              {t("backToHome")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
