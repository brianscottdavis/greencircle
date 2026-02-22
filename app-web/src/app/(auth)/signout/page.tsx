"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";

export default function SignOutPage() {
  useEffect(() => {
    void signOut({ callbackUrl: "/login" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-emerald-700 to-emerald-900 text-white">
      <Link href="/" className="mb-8 font-semibold transition-opacity hover:opacity-80">
        GreenCircle
      </Link>
      <p className="mb-8 text-emerald-100">Signing you out…</p>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-400 border-t-white" />
    </div>
  );
}
