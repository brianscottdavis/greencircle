"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const REQUEST_TYPES = [
  { value: "BulkyPickup", label: "Bulky waste pickup" },
  { value: "Overflow", label: "Overflowing bin" },
  { value: "MissedService", label: "Missed collection" },
] as const;

export default function NewBookingPage() {
  const router = useRouter();
  const utils = api.useUtils();
  const { data: memberships, isLoading } = api.household.listMine.useQuery();
  const createMutation = api.serviceRequest.create.useMutation({
    onSuccess: async () => {
      router.refresh();
      await utils.serviceRequest.listMine.invalidate();
      router.push("/bookings");
    },
    onError: (err) => alert(err.message),
  });

  const households = memberships?.map((m) => m.household) ?? [];
  const hasHouseholds = households.length > 0;

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-emerald-800/80">Loading…</p>
      </div>
    );
  }

  if (!hasHouseholds) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-emerald-900">New request</h1>
        <p className="mt-2 text-emerald-800/80">
          Add a household to your profile before creating a service request.
        </p>
        <Button asChild className="mt-4">
          <Link href="/profile">Go to profile</Link>
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
        <h1 className="text-2xl font-bold text-emerald-900">New request</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const fd = new FormData(form);
          const requestType = fd.get("requestType") as
            | "BulkyPickup"
            | "Overflow"
            | "MissedService";
          const householdId = fd.get("householdId") as string;
          const description = (fd.get("description") as string) || undefined;

          if (!requestType || !householdId) return;
          createMutation.mutate({
            requestType,
            householdId,
            description,
          });
        }}
        className="max-w-lg space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-emerald-900">
            Household
          </label>
          <select
            name="householdId"
            required
            className="w-full rounded-lg border border-emerald-600 bg-white px-4 py-2 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select address</option>
            {households.map((h) => (
              <option key={h.id} value={h.id}>
                {h.addressLine1}
                {h.suburb ? `, ${h.suburb}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-emerald-900">
            Request type
          </label>
          <select
            name="requestType"
            required
            className="w-full rounded-lg border border-emerald-600 bg-white px-4 py-2 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select type</option>
            {REQUEST_TYPES.map(({ value, label }) => (
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
            placeholder="e.g. Furniture, mattress, green waste..."
          />
        </div>

        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Submitting…" : "Submit request"}
        </Button>
      </form>
    </div>
  );
}
