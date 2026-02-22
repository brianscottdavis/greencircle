"use client";

import { Fragment, useState } from "react";
import { Menu, X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";
import { LocaleSwitcher } from "~/components/LocaleSwitcher";

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const t = useTranslations("common");
  const tNav = useTranslations("nav");
  const tHome = useTranslations("home");

  const navLinks = [
    { href: "/about", label: tNav("about") },
    { href: "/guides", label: tNav("guides") },
    { href: "/challenges", label: tNav("challenges") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-200 bg-white">
      <nav className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <img
            src="/greencircle-vector.svg"
            alt="GreenCircle"
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-emerald-800 transition hover:text-emerald-600"
            >
              {link.label}
            </Link>
          ))}
          <LocaleSwitcher />
          {isLoggedIn ? (
            <>
              <Button asChild variant="ghost" className="text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900">
                <Link href="/dashboard">{tHome("goToDashboard")}</Link>
              </Button>
              <Button
                variant="outline"
                className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                onClick={() => signOut()}
              >
                {t("signOut")}
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900">
                  {t("signIn")}
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                  {t("register")}
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-emerald-800 hover:bg-emerald-50"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 md:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-end px-4 pt-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <Dialog.Panel className="w-full max-w-xs rounded-xl border border-emerald-200 bg-white p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-900">{t("menu")}</span>
                    <button
                      type="button"
                      className="rounded-lg p-2 text-emerald-800 hover:bg-emerald-50"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-emerald-800 hover:text-emerald-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    {isLoggedIn ? (
                      <>
                        <Link
                          href="/dashboard"
                          className="block"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button variant="outline" className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                            {tHome("goToDashboard")}
                          </Button>
                        </Link>
                        <Button
                          variant="default"
                          className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            void signOut();
                          }}
                        >
                          {t("signOut")}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button variant="outline" className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                            {t("signIn")}
                          </Button>
                        </Link>
                        <Link
                          href="/register"
                          className="block"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                            {t("register")}
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
}
