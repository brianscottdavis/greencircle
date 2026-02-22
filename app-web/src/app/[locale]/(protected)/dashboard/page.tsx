import { Link } from "~/i18n/navigation";
import { HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col p-6">
        <h1 className="text-2xl font-bold text-emerald-900">Dashboard</h1>
        <p className="mt-2 text-emerald-800/80">
          Welcome, {session?.user?.name ?? session?.user?.email ?? "Guest"}.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/bookings"
            className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm transition hover:border-emerald-300"
          >
            <h3 className="font-semibold text-emerald-900">Bookings</h3>
            <p className="mt-1 text-sm text-emerald-800/80">Manage service requests</p>
          </Link>
          <Link
            href="/reports"
            className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm transition hover:border-emerald-300"
          >
            <h3 className="font-semibold text-emerald-900">Reports</h3>
            <p className="mt-1 text-sm text-emerald-800/80">Report issues</p>
          </Link>
          <Link
            href="/challenges/my"
            className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm transition hover:border-emerald-300"
          >
            <h3 className="font-semibold text-emerald-900">Challenges</h3>
            <p className="mt-1 text-sm text-emerald-800/80">Join community challenges</p>
          </Link>
        </div>
      </main>
    </HydrateClient>
  );
}
