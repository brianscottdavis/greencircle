"use client";

import Link from "next/link";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function ReportsPage() {
  const { data: reports, isLoading } = api.report.listMine.useQuery();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Reports</h1>
          <p className="mt-1 text-emerald-800/80">
            Report contamination, missed pickups, or overflow issues.
          </p>
        </div>
        <Button asChild>
          <Link href="/reports/new">New report</Link>
        </Button>
      </div>

      {isLoading ? (
        <p className="text-emerald-800/80">Loading…</p>
      ) : !reports?.length ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-emerald-800/80">No reports yet.</p>
            <Button asChild className="mt-4">
              <Link href="/reports/new">New report</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {reports.map((r) => (
            <Card key={r.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/reports/${r.id}`}
                    className="font-medium capitalize text-emerald-900 hover:underline"
                  >
                    {r.reportType.replace(/([A-Z])/g, " $1").trim()}
                  </Link>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                    {r.status}
                  </span>
                </div>
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
