"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Link } from "~/i18n/navigation";
import { getLocalePath } from "~/lib/i18n";

export default function RegisterForm() {
  const t = useTranslations("register");
  const locale = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const registerMutation = api.auth.register.useMutation({
    onSuccess: async () => {
      setError(null);
      const callbackUrl = getLocalePath("/auth/redirect", locale);
      const res = await signIn("credentials", {
        redirect: false,
        email: email.toLowerCase().trim(),
        password,
        callbackUrl,
      });
      if (res?.ok) {
        window.location.href = callbackUrl;
      } else {
        setError(t("accountCreatedSignIn"));
        window.location.href = getLocalePath("/login", locale);
      }
    },
    onError: (err) => {
      const data = err.data as { code?: string } | undefined;
      setError(data?.code === "CONFLICT" ? t("emailExists") : err.message);
    },
  });

  const loading = registerMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    registerMutation.mutate({
      email,
      password,
      confirmPassword,
      name: name.trim() || undefined,
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center py-12">
      <Link href="/" className="mb-8 transition-opacity hover:opacity-80">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white sm:h-24 sm:w-24">
          <img
            src="/greencircle-vector.svg"
            alt="GreenCircle"
            className="h-12 w-auto sm:h-14"
          />
        </div>
      </Link>
      <h1 className="mb-2 text-xl font-bold text-emerald-50">{t("title")}</h1>
      <p className="mb-8 text-emerald-100">{t("subtitle")}</p>

      {error && (
        <div className="mb-4 max-w-sm text-center text-red-300">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-emerald-600 bg-white/10 p-6 backdrop-blur-sm"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-emerald-100"
          >
            {t("nameOptional")}
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder={t("placeholderName")}
            className="bg-white/90"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-emerald-100"
          >
            {t("email")}
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder={t("placeholderEmail")}
            className="bg-white/90"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-emerald-100"
          >
            {t("password")}
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder={t("placeholderPassword")}
            className="bg-white/90"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-emerald-100"
          >
            {t("confirmPassword")}
          </label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder={t("placeholderConfirm")}
            className="bg-white/90"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-800 hover:bg-emerald-700"
        >
          {loading ? t("creatingAccount") : t("createAccount")}
        </Button>

        <p className="mt-4 text-center text-sm text-emerald-200">
          {t("alreadyHaveAccount")}{" "}
          <Link href="/login" className="font-medium hover:underline">
            {t("signIn")}
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-emerald-200">
          <Link href="/" className="hover:underline">
            {t("backToHome")}
          </Link>
        </p>
      </form>
    </div>
  );
}
