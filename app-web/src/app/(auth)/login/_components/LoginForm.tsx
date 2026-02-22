"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function getErrorMessage(code: string): string {
  switch (code) {
    case "CredentialsSignin":
      return "Invalid email or password. Please try again.";
    case "AccessDenied":
      return "Access denied. Please contact support.";
    case "Verification":
      return "Verification failed. Please try again.";
    case "Configuration":
      return "Authentication configuration error. Please contact support.";
    default:
      return "Authentication failed. Please check your credentials.";
  }
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const nextAuthError = searchParams.get("error");
  const initialError = nextAuthError ? getErrorMessage(nextAuthError) : null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const rawCallback = searchParams.get("callbackUrl");
  const callbackUrl =
    rawCallback && rawCallback !== "/" && rawCallback !== "undefined"
      ? decodeURIComponent(rawCallback)
      : "/auth/redirect";

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
      setError("Unexpected error. Please try again.");
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
    <div className="flex w-full flex-col items-center justify-center py-12">
      <Link href="/" className="mb-8 font-semibold transition-opacity hover:opacity-80">
        GreenCircle
      </Link>
      <p className="mb-8 text-emerald-100">Please log in to continue</p>

      {(error ?? initialError) && (
        <div className="mb-4 max-w-sm text-center text-red-300">{error ?? initialError}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-emerald-600 bg-white/10 p-6 backdrop-blur-sm"
      >
        <div className="mb-6">
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-emerald-100">
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            placeholder="you@example.com"
            className="bg-white/90"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-emerald-100">
            Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="bg-white/90"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-800 hover:bg-emerald-700"
        >
          {loading ? "Logging in…" : "Log in"}
        </Button>

        <p className="mt-4 text-center text-sm text-emerald-200">
          <Link href="/" className="hover:underline">
            ← Back to home
          </Link>
        </p>
      </form>
    </div>
  );
}
