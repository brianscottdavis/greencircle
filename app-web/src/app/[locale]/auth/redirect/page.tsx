import { auth } from "~/server/auth";
import { getDefaultRouteForRole } from "~/lib/auth/roles";
import { redirect } from "~/i18n/navigation";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ next?: string }>;
  params: Promise<{ locale: string }>;
};

/**
 * Post-login redirect: sends user to role-appropriate dashboard
 * when no explicit callbackUrl was provided.
 */
export default async function AuthRedirectPage({ searchParams, params }: Props) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect({ href: "/login", locale });
  }

  const search = await searchParams;
  const explicitNext = search?.next;

  if (explicitNext && explicitNext.startsWith("/")) {
    redirect({ href: explicitNext, locale });
  }

  const role = (session!.user as { role?: string }).role;
  const defaultRoute = getDefaultRouteForRole(role);
  redirect({ href: defaultRoute, locale });
}
