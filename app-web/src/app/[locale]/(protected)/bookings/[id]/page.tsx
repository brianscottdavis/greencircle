"use client";

import { Link } from "~/i18n/navigation";
import { useParams, useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const utils = api.useUtils();
  const { data: requests } = api.serviceRequest.listMine.useQuery();
  const request = requests?.find((r) => r.id === params.id);
  const deleteMutation = api.serviceRequest.delete.useMutation({
    onSuccess: async () => {
      await utils.serviceRequest.listMine.invalidate();
      router.push("/bookings");
    },
    onError: (err) => alert(err.message),
  });

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
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            {request.description && (
              <p className="text-emerald-800">{request.description}</p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
            disabled={deleteMutation.isPending}
            onClick={() => {
              if (
                window.confirm(
                  "Cancel this request? This cannot be undone."
                )
              ) {
                deleteMutation.mutate({ id: request.id });
              }
            }}
          >
            Cancel request
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
