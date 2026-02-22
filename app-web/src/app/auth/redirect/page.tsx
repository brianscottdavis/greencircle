import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { getDefaultRouteForRole } from "~/lib/auth/roles";

export const dynamic = "force-dynamic";

/**
 * Post-login redirect: sends user to role-appropriate dashboard
 * when no explicit callbackUrl was provided.
 */
export default async function AuthRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const params = await searchParams;
  const explicitNext = params?.next;

  if (explicitNext && explicitNext.startsWith("/")) {
    redirect(explicitNext);
  }

  const role = (session.user as { role?: string }).role;
  const defaultRoute = getDefaultRouteForRole(role);
  redirect(defaultRoute);
}
