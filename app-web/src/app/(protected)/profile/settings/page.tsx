"use client";

import Link from "next/link";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export default function ProfileSettingsPage() {
  const { data: session } = api.auth.getSession.useQuery();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/profile">← Back</Link>
        </Button>
        <h1 className="text-2xl font-bold text-emerald-900">Profile settings</h1>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-emerald-900">
              Name
            </label>
            <Input
              defaultValue={session?.user?.name ?? ""}
              placeholder="Your name"
              disabled
            />
            <p className="mt-1 text-xs text-emerald-800/70">
              Contact support to change your name.
            </p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-emerald-900">
              Email
            </label>
            <Input
              defaultValue={session?.user?.email ?? ""}
              placeholder="Email"
              disabled
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
