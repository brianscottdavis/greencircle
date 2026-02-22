import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { AppShell } from "./_components/AppShell";
import { HydrateClient } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <HydrateClient>
      <AppShell user={session.user}>
        {children}
      </AppShell>
    </HydrateClient>
  );
}
