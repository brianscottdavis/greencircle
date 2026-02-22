"use client";

import Link from "next/link";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function ProfileHouseholdPage() {
  const { data: memberships, isLoading } = api.household.listMine.useQuery();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/profile">← Back</Link>
        </Button>
        <h1 className="text-2xl font-bold text-emerald-900">Household</h1>
      </div>

      {isLoading ? (
        <p className="text-emerald-800/80">Loading…</p>
      ) : !memberships?.length ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-emerald-800/80">No households linked yet.</p>
            <p className="mt-2 text-sm text-emerald-800/70">
              Contact support to add your address to your account.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {memberships.map((m) => (
            <Card key={m.id}>
              <CardHeader>
                <CardTitle className="text-base">
                  {m.household.addressLine1}
                  {m.household.suburb ? `, ${m.household.suburb}` : ""}
                  {m.household.postcode ? ` ${m.household.postcode}` : ""}
                </CardTitle>
                <p className="text-sm text-emerald-800/80">
                  {m.isPrimary ? "Primary address" : "Member"}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
