"use client";

import { Link } from "~/i18n/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export default function CrewRoutesPage() {
  const { data: jobs, isLoading } = api.job.listForCrew.useQuery();
  const scheduled = jobs?.filter((j) => j.scheduledFor) ?? [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-emerald-900">Routes</h1>
      <p className="mt-2 text-emerald-800/80">
        Optimized route view for scheduled jobs.
      </p>

      {isLoading ? (
        <p className="mt-8 text-emerald-800/80">Loading…</p>
      ) : !scheduled.length ? (
        <Card className="mt-8">
          <CardContent className="pt-6">
            <p className="text-emerald-800/80">No scheduled routes yet.</p>
            <Button asChild className="mt-4">
              <Link href="/crew/dashboard">View jobs</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 space-y-3">
          {scheduled.map((job, i) => (
            <Card key={job.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-emerald-900">
                      {i + 1}. {job.serviceRequest?.household.addressLine1}
                      {job.serviceRequest?.household.suburb ? `, ${job.serviceRequest?.household.suburb}` : ""}
                    </span>
                    <p className="text-sm text-emerald-800/80">
                      {job.serviceRequest?.requestType}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/crew/jobs/${job.id}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
