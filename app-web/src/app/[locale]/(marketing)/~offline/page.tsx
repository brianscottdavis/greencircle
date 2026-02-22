import { Link } from "~/i18n/navigation";

import { Button } from "~/components/ui/button";

export default function OfflineFallbackPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-emerald-50 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-emerald-900">You&apos;re offline</h1>
        <p className="mt-2 text-emerald-800/80">
          Connect to the internet to use GreenCircle. Your data will sync when you&apos;re back online.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Retry</Link>
        </Button>
      </div>
    </main>
  );
}
