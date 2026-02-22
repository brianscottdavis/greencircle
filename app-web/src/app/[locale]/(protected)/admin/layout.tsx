import { redirect } from "~/i18n/navigation";
import { auth } from "~/server/auth";
import { ROLES } from "~/lib/auth/roles";

export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLayout({ children, params }: Props) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) redirect({ href: "/login", locale });

  const role = (session!.user as { role?: string }).role;
  if (role !== ROLES.ADMIN && role !== ROLES.AMBASSADOR) {
    redirect({ href: "/dashboard", locale });
  }

  return <>{children}</>;
}
