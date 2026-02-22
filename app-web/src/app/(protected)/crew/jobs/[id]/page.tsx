"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function CrewJobDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: job, isLoading } = api.job.byId.useQuery(
    { id: params.id },
    { enabled: !!params.id }
  );
  const completeMutation = api.job.complete.useMutation({
    onSuccess: () => router.refresh(),
    onError: (err) => alert(err.message),
  });

  if (isLoading || !job) {
    return (
      <div className="p-6">
        <p className="text-emerald-800/80">{isLoading ? "Loading…" : "Job not found."}</p>
        <Button asChild className="mt-4">
          <Link href="/crew/dashboard">Back</Link>
        </Button>
      </div>
    );
  }

  const sr = job.serviceRequest;
  const canComplete = job.status !== "Completed";

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/crew/dashboard">← Back</Link>
        </Button>
        <h1 className="text-2xl font-bold text-emerald-900">Job #{job.id.slice(-6)}</h1>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="font-medium text-emerald-900">
                {sr?.requestType ?? "Job"} – {sr?.household.addressLine1}
                {sr?.household.suburb ? `, ${sr?.household.suburb}` : ""}
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                {job.status}
              </span>
            </div>
            {sr?.description && (
              <p className="text-emerald-800">{sr.description}</p>
            )}
          </CardHeader>
        </Card>

        {canComplete && (
          <Button
            onClick={() => completeMutation.mutate({ id: job.id })}
            disabled={completeMutation.isPending}
          >
            {completeMutation.isPending ? "Completing…" : "Mark complete"}
          </Button>
        )}
      </div>
    </div>
  );
}
