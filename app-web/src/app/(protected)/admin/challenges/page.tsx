"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

const STATUSES = ["Upcoming", "Active", "Ended", "Archived"] as const;

export default function AdminChallengesPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Upcoming" | "Active">("Upcoming");

  const utils = api.useUtils();
  const { data: challenges, isLoading } = api.admin.listChallenges.useQuery();
  const createMutation = api.admin.createChallenge.useMutation({
    onSuccess: async () => {
      setTitle("");
      setDescription("");
      await utils.admin.listChallenges.invalidate();
      await utils.challenge.listPublic.invalidate();
    },
    onError: (err) => alert(err.message),
  });
  const updateStatusMutation = api.admin.updateChallengeStatus.useMutation({
    onSuccess: async () => {
      await utils.admin.listChallenges.invalidate();
    },
    onError: (err) => alert(err.message),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-emerald-900">Challenges</h1>
      <p className="mt-2 text-emerald-800/80">
        Manage community challenges (admin / ambassador)
      </p>

      <Card className="mt-8">
        <CardHeader>
          <h2 className="font-semibold text-emerald-900">Create challenge</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-emerald-900">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Plastic-Free Week"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-emerald-900">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Challenge description..."
              className="w-full rounded-lg border border-emerald-600 px-4 py-2 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-emerald-900">
              Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Upcoming" | "Active")
              }
              className="w-full rounded-lg border border-emerald-600 bg-white px-4 py-2 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Active">Active</option>
            </select>
          </div>
          <Button
            onClick={() =>
              createMutation.mutate({
                title,
                description: description || undefined,
                status,
              })
            }
            disabled={!title.trim() || createMutation.isPending}
          >
            {createMutation.isPending ? "Creating…" : "Create challenge"}
          </Button>
        </CardContent>
      </Card>

      <h2 className="mt-12 text-lg font-semibold text-emerald-900">
        All challenges
      </h2>
      {isLoading ? (
        <p className="mt-4 text-emerald-800/80">Loading…</p>
      ) : !challenges?.length ? (
        <p className="mt-4 text-emerald-800/80">No challenges yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {challenges.map((c) => (
            <Card key={c.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-emerald-900">{c.title}</h3>
                    {c.description && (
                      <p className="mt-1 text-sm text-emerald-800/80">
                        {c.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                      {c.status}
                    </span>
                    <span className="text-xs text-emerald-800/70">
                      {c._count.participations} participant
                      {c._count.participations !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.filter((s) => s !== c.status).map((s) => (
                    <Button
                      key={s}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateStatusMutation.mutate({ id: c.id, status: s })
                      }
                      disabled={updateStatusMutation.isPending}
                    >
                      Set {s}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
