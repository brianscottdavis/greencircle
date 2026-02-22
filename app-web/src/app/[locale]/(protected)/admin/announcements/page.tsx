"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export default function AdminAnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data: announcements, isLoading } = api.admin.listAnnouncements.useQuery();
  const createMutation = api.admin.createAnnouncement.useMutation({
    onSuccess: () => {
      setTitle("");
      setBody("");
    },
    onError: (err) => alert(err.message),
  });
  const createNoticeMutation = api.admin.createNoticeboardPost.useMutation({
    onSuccess: () => {},
    onError: (err) => alert(err.message),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-emerald-900">Announcements</h1>
      <p className="mt-2 text-emerald-800/80">Create and manage announcements.</p>

      <Card className="mt-8">
        <CardHeader>
          <h2 className="font-semibold text-emerald-900">New announcement</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-emerald-900">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement title"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-emerald-900">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Announcement body"
              className="w-full rounded-lg border border-emerald-600 px-4 py-2 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() =>
                createMutation.mutate({ title, body: body || undefined })
              }
              disabled={!title.trim() || createMutation.isPending}
            >
              Create announcement
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                createNoticeMutation.mutate({ title, body: body || undefined })
              }
              disabled={!title.trim() || createNoticeMutation.isPending}
            >
              Add to noticeboard
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="mt-12 text-lg font-semibold text-emerald-900">Recent announcements</h2>
      {isLoading ? (
        <p className="mt-4 text-emerald-800/80">Loading…</p>
      ) : !announcements?.length ? (
        <p className="mt-4 text-emerald-800/80">No announcements yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {announcements.map((a) => (
            <Card key={a.id}>
              <CardHeader>
                <h3 className="font-medium text-emerald-900">{a.title}</h3>
                <p className="text-sm text-emerald-800/70">
                  By {a.author.name ?? a.author.email} • {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : "Draft"}
                </p>
              </CardHeader>
              {a.body && (
                <CardContent>
                  <p className="text-emerald-800 whitespace-pre-wrap">{a.body}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
