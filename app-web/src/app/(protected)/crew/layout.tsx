import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { ROLES } from "~/lib/auth/roles";

export const dynamic = "force-dynamic";

export default async function CrewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const role = (session.user as { role?: string }).role;
  if (role !== ROLES.CREW && role !== ROLES.ADMIN) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
