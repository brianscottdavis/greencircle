"use client";

import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function OfflinePage() {
  const { data: assets, isLoading } = api.offline.listAssets.useQuery();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-emerald-900">Offline assets</h1>
      <p className="mt-2 text-emerald-800/80">
        Downloadable guides and schedules for use when connectivity is limited.
      </p>

      {isLoading ? (
        <p className="mt-8 text-emerald-800/80">Loading…</p>
      ) : !assets?.length ? (
        <Card className="mt-8">
          <CardContent className="pt-6">
            <p className="text-emerald-800/80">No offline assets available yet.</p>
            <p className="mt-2 text-sm text-emerald-800/70">
              Collection schedules and sorting guides will appear here when available.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="mt-8 space-y-4">
          {assets.map((a) => (
            <Card key={a.id}>
              <CardHeader>
                <h2 className="font-semibold capitalize text-emerald-900">
                  {a.assetType.replace(/([A-Z])/g, " $1").trim()}
                </h2>
                <p className="text-sm text-emerald-800/70">
                  Cached {new Date(a.cachedAt).toLocaleDateString()}
                </p>
              </CardHeader>
              {a.url && (
                <CardContent>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    Open →
                  </a>
                </CardContent>
              )}
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
