import { redirect } from "~/i18n/navigation";
import { auth } from "~/server/auth";
import { AppShell } from "./_components/AppShell";
import { HydrateClient } from "~/trpc/server";

export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function ProtectedLayout({ children, params }: Props) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect({ href: "/login", locale });
  }

  return (
    <HydrateClient>
      <AppShell user={session!.user}>
        {children}
      </AppShell>
    </HydrateClient>
  );
}
