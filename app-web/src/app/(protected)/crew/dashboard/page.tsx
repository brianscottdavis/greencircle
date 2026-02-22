"use client";

import Link from "next/link";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function CrewDashboardPage() {
  const { data: jobs, isLoading } = api.job.listForCrew.useQuery();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-emerald-900">Crew Dashboard</h1>
      <p className="mt-2 text-emerald-800/80">Assigned jobs and routing</p>

      {isLoading ? (
        <p className="mt-8 text-emerald-800/80">Loading…</p>
      ) : !jobs?.length ? (
        <Card className="mt-8">
          <CardContent className="pt-6">
            <p className="text-emerald-800/80">No pending jobs.</p>
          </CardContent>
        </Card>
      ) : (
        <ul className="mt-8 space-y-3">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/crew/jobs/${job.id}`}
                    className="font-medium text-emerald-900 hover:underline"
                  >
                    {job.serviceRequest?.requestType ?? "Job"} – {job.serviceRequest?.household.addressLine1}
                  </Link>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                    {job.status}
                  </span>
                </div>
                {job.scheduledFor && (
                  <p className="text-sm text-emerald-800/80">
                    Scheduled: {new Date(job.scheduledFor).toLocaleString()}
                  </p>
                )}
              </CardHeader>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
