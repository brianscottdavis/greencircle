"use client";

import Link from "next/link";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function BookingsPage() {
  const { data: requests, isLoading } =
    api.serviceRequest.listMine.useQuery();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Bookings</h1>
          <p className="mt-1 text-emerald-800/80">
            Manage your service requests and bulky pickups.
          </p>
        </div>
        <Button asChild>
          <Link href="/bookings/new">New request</Link>
        </Button>
      </div>

      {isLoading ? (
        <p className="text-emerald-800/80">Loading…</p>
      ) : !requests?.length ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-emerald-800/80">
              No requests yet. Create a bulky pickup, overflow report, or missed
              service request.
            </p>
            <Button asChild className="mt-4">
              <Link href="/bookings/new">New request</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {requests.map((r) => (
            <Card key={r.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">
                    {r.requestType.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                    {r.status}
                  </span>
                </div>
                <p className="text-sm text-emerald-800/80">
                  {r.household.addressLine1}
                  {r.household.suburb ? `, ${r.household.suburb}` : ""}
                </p>
                {r.description && (
                  <p className="text-sm text-emerald-700">{r.description}</p>
                )}
              </CardHeader>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
