import { Suspense } from "react";
import { HydrateClient } from "~/trpc/server";
import RegisterForm from "./_components/RegisterForm";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-emerald-700 to-emerald-900 px-4">
        <Suspense fallback={<p className="text-emerald-100">Loading...</p>}>
          <RegisterForm />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
