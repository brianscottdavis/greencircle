"use client";

import { Link } from "~/i18n/navigation";
import { useParams } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function AdminJobDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: job, isLoading } = api.job.byId.useQuery(
    { id: params.id },
    { enabled: !!params.id }
  );

  if (isLoading || !job) {
    return (
      <div className="p-6">
        <p className="text-emerald-800/80">{isLoading ? "Loading…" : "Job not found."}</p>
        <Button asChild className="mt-4">
          <Link href="/admin/jobs">Back</Link>
        </Button>
      </div>
    );
  }

  const sr = job.serviceRequest;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/jobs">← Back</Link>
        </Button>
        <h1 className="text-2xl font-bold text-emerald-900">Job #{job.id.slice(-6)}</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <span className="font-medium text-emerald-900">
              {sr?.requestType ?? "Job"}
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              {job.status}
            </span>
          </div>
          <p className="text-sm text-emerald-800/80">
            {sr?.household.addressLine1}
            {sr?.household.suburb ? `, ${sr?.household.suburb}` : ""}
            {sr?.household.postcode ? ` ${sr?.household.postcode}` : ""}
          </p>
          {sr?.description && (
            <p className="text-emerald-800">{sr.description}</p>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-emerald-800/70">
            Request from: {sr?.createdBy?.name ?? sr?.createdBy?.email ?? "—"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
