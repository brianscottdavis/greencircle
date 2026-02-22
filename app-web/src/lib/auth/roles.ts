/**
 * Actor roles from community-waste-platform spec.
 * Identity system must support all four login-capable actors.
 */
export const ROLES = {
  RESIDENT: "resident",
  CREW: "crew",
  AMBASSADOR: "ambassador",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/** Default landing route per role after login */
export const ROLE_DEFAULT_ROUTES: Record<Role, string> = {
  [ROLES.RESIDENT]: "/dashboard",
  [ROLES.CREW]: "/crew/dashboard",
  [ROLES.AMBASSADOR]: "/admin/challenges",
  [ROLES.ADMIN]: "/admin/dashboard",
};

export function getDefaultRouteForRole(role: string | null | undefined): string {
  if (!role || !(role in ROLE_DEFAULT_ROUTES)) {
    return ROLE_DEFAULT_ROUTES[ROLES.RESIDENT];
  }
  return ROLE_DEFAULT_ROUTES[role as Role];
}
