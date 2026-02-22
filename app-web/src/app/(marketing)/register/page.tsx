import Link from "next/link";
import { HydrateClient } from "~/trpc/server";

export default function RegisterPage() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-emerald-50 px-4">
        <div className="w-full max-w-md rounded-xl border border-emerald-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-emerald-900">Create account</h1>
          <p className="mt-2 text-emerald-800/80">
            Registration form coming soon. For now, use your existing provider to sign in.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-700"
          >
            Sign in with provider
          </Link>
          <Link
            href="/"
            className="mt-4 block text-emerald-600 hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    </HydrateClient>
  );
}
