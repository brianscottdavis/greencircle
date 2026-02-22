"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const REPORT_TYPES = [
  { value: "Contamination", label: "Contamination" },
  { value: "MissedPickup", label: "Missed pickup" },
  { value: "Overflow", label: "Overflowing bin" },
] as const;

export default function NewReportPage() {
  const router = useRouter();
  const utils = api.useUtils();
  const createMutation = api.report.create.useMutation({
    onSuccess: async () => {
      // Cache invalidation order (per CACHE-INVALIDATION-ORDER): route cache first, then React Query
      router.refresh();
      await utils.report.listMine.invalidate();
      router.push("/reports");
    },
    onError: (err) => alert(err.message),
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/reports">← Back</Link>
        </Button>
        <h1 className="text-2xl font-bold text-emerald-900">New report</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const fd = new FormData(form);
          const reportType = fd.get("reportType") as
            | "Contamination"
            | "MissedPickup"
            | "Overflow";
          const description = (fd.get("description") as string) || undefined;

          if (!reportType) return;
          createMutation.mutate({ reportType, description });
        }}
        className="max-w-lg space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-emerald-900">
            Report type
          </label>
          <select
            name="reportType"
            required
            className="w-full rounded-lg border border-emerald-600 bg-white px-4 py-2 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select type</option>
            {REPORT_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-emerald-900">
            Description (optional)
          </label>
          <Input
            name="description"
            placeholder="e.g. Bin not emptied, wrong items in recycling..."
          />
        </div>

        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Submitting…" : "Submit report"}
        </Button>
      </form>
    </div>
  );
}
