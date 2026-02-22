"use client";

import { Link } from "~/i18n/navigation";
import { useParams, useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function ReportDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const utils = api.useUtils();
  const { data: report, isLoading } = api.report.byId.useQuery(
    { id: params.id },
    { enabled: !!params.id }
  );
  const deleteMutation = api.report.delete.useMutation({
    onSuccess: async () => {
      await utils.report.listMine.invalidate();
      router.push("/reports");
    },
    onError: (err) => alert(err.message),
  });

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
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            {report.description && (
              <p className="text-emerald-800">{report.description}</p>
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
                  "Cancel this report? This cannot be undone."
                )
              ) {
                deleteMutation.mutate({ id: report.id });
              }
            }}
          >
            Cancel report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
