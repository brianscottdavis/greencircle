"use client";

import { Link } from "~/i18n/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function MyChallengesPage() {
  const { data: participations, isLoading } = api.challenge.listMine.useQuery();
  const listPublic = api.challenge.listPublic.useQuery();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-emerald-900">My Challenges</h1>
      <p className="mt-2 text-emerald-800/80">
        View and track your challenge participation.
      </p>

      {isLoading ? (
        <p className="mt-8 text-emerald-800/80">Loading…</p>
      ) : !participations?.length ? (
        <Card className="mt-8">
          <CardContent className="pt-6">
            <p className="text-emerald-800/80">You haven&apos;t joined any challenges yet.</p>
            <Button asChild className="mt-4">
              <Link href="/challenges">Browse challenges</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ul className="mt-8 space-y-4">
          {participations.map((p) => (
            <Card key={p.id}>
              <CardHeader>
                <h2 className="font-semibold text-emerald-900">{p.challenge.title}</h2>
                <p className="text-sm text-emerald-800/80">{p.challenge.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-sm font-medium text-emerald-800">
                    Progress: {p.progress ?? 0}
                    {p.challenge.points ? ` / ${p.challenge.points} pts` : ""}
                  </span>
                  <span className="text-xs text-emerald-800/70">{p.challenge.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
