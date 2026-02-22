"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: requests } = api.serviceRequest.listMine.useQuery();
  const request = requests?.find((r) => r.id === params.id);

  if (!requests) {
    return (
      <div className="p-6">
        <p className="text-emerald-800/80">Loading…</p>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="p-6">
        <p className="text-emerald-800/80">Request not found.</p>
        <Button asChild className="mt-4">
          <Link href="/bookings">Back to bookings</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/bookings">← Back</Link>
        </Button>
        <h1 className="text-2xl font-bold text-emerald-900">Request detail</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <span className="font-medium capitalize text-emerald-900">
              {request.requestType.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              {request.status}
            </span>
          </div>
          <p className="text-sm text-emerald-800/80">
            {request.household.addressLine1}
            {request.household.suburb ? `, ${request.household.suburb}` : ""}
          </p>
        </CardHeader>
        <CardContent>
          {request.description && (
            <p className="text-emerald-800">{request.description}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
