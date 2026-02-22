"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Menu, X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "~/components/ui/button";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/challenges", label: "Challenges" },
] as const;

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-800/30 bg-emerald-900/95 backdrop-blur supports-[backdrop-filter]:bg-emerald-900/80">
      <nav className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/emblem.png"
            alt=""
            className="h-8 w-auto"
            aria-hidden
          />
          <span className="font-semibold">
            <span className="text-emerald-200">Green</span>
            <span className="text-emerald-50">Circle</span>
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-emerald-100 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-emerald-800 hover:text-white">
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="border-white text-white hover:bg-emerald-800">
              Register
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-emerald-100 hover:bg-emerald-800"
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
            <div className="fixed inset-0 bg-emerald-900/80" />
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
                <Dialog.Panel className="w-full max-w-xs rounded-xl bg-emerald-900 p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Menu</span>
                    <button
                      type="button"
                      className="rounded-lg p-2 text-emerald-100 hover:bg-emerald-800"
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
                        className="text-emerald-100 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/login"
                      className="block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full border-white text-white">
                        Sign in
                      </Button>
                    </Link>
                    <Link
                      href="/register"
                      className="block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-white text-emerald-800 hover:bg-emerald-50">
                        Register
                      </Button>
                    </Link>
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
