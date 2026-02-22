"use client";

import { Link } from "~/i18n/navigation";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { ROLES } from "~/lib/auth/roles";
import { LocaleSwitcher } from "~/components/LocaleSwitcher";

const residentNav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/bookings", label: "Bookings" },
  { href: "/reports", label: "Reports" },
  { href: "/challenges/my", label: "My Challenges" },
  { href: "/profile", label: "Profile" },
  { href: "/notices", label: "Notices" },
  { href: "/offline", label: "Offline" },
] as const;

const crewNav = [
  { href: "/crew/dashboard", label: "Crew Jobs" },
  { href: "/crew/routes", label: "Routes" },
] as const;

const adminNav = [
  { href: "/admin/dashboard", label: "Admin" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/challenges", label: "Challenges" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/announcements", label: "Announcements" },
] as const;

export function AppShell({
  user,
  children,
}: {
  user: Session["user"];
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-56 flex-col border-r border-emerald-200 bg-emerald-50/50 lg:flex">
        <div className="flex h-14 items-center border-b border-emerald-200 px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img
              src="/greencircle-vector.svg"
              alt=""
              className="h-7 w-auto"
            />
            <span className="font-bold tracking-tight text-emerald-900">
              <span className="text-emerald-800">Green</span>
              <span className="text-lime-600">Circle</span>
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {residentNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                pathname === item.href || pathname?.startsWith(item.href + "/")
                  ? "bg-emerald-100 text-emerald-900"
                  : "text-emerald-800 hover:bg-emerald-100/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {((user as { role?: string }).role === ROLES.CREW || (user as { role?: string }).role === ROLES.ADMIN) && (
            <div className="my-2 border-t border-emerald-200 pt-2">
              <p className="px-3 py-1 text-xs font-semibold uppercase text-emerald-600">Crew</p>
              {crewNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                      pathname?.startsWith(item.href) ? "bg-emerald-100 text-emerald-900" : "text-emerald-800 hover:bg-emerald-100/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          )}
          {((user as { role?: string }).role === ROLES.ADMIN || (user as { role?: string }).role === ROLES.AMBASSADOR) && (
            <div className="my-2 border-t border-emerald-200 pt-2">
              <p className="px-3 py-1 text-xs font-semibold uppercase text-emerald-600">Admin</p>
              {adminNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                      pathname?.startsWith(item.href) ? "bg-emerald-100 text-emerald-900" : "text-emerald-800 hover:bg-emerald-100/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-56">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-emerald-200 bg-white px-4">
          <div className="lg:hidden">
            <Link href="/dashboard" className="flex items-center gap-2">
              <img src="/greencircle-vector.svg" alt="" className="h-7 w-auto" />
              <span className="font-bold tracking-tight text-emerald-900">
                <span className="text-emerald-800">Green</span>
                <span className="text-lime-600">Circle</span>
              </span>
            </Link>
          </div>
          <div className="ml-auto flex flex-wrap items-center justify-end gap-2 sm:gap-4">
            <LocaleSwitcher />
            <span className="truncate text-sm text-emerald-800 max-sm:max-w-20">
              {user.name ?? user.email}
            </span>
            <Link
              href="/signout"
              className="text-sm text-emerald-600 hover:underline"
            >
              Sign out
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
