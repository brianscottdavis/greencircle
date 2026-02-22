"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function ReportDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: report, isLoading } = api.report.byId.useQuery(
    { id: params.id },
    { enabled: !!params.id }
  );

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-emerald-800/80">Loading…</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-6">
        <p className="text-emerald-800/80">Report not found.</p>
        <Button asChild className="mt-4">
          <Link href="/reports">Back to reports</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/reports">← Back</Link>
        </Button>
        <h1 className="text-2xl font-bold text-emerald-900">Report detail</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <span className="font-medium capitalize text-emerald-900">
              {report.reportType.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              {report.status}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {report.description && (
            <p className="text-emerald-800">{report.description}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
