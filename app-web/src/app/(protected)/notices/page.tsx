"use client";

import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function NoticesPage() {
  const { data: posts, isLoading } = api.noticeboard.list.useQuery();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-emerald-900">Notices</h1>
      <p className="mt-2 text-emerald-800/80">
        Community noticeboard and announcements.
      </p>

      {isLoading ? (
        <p className="mt-8 text-emerald-800/80">Loading…</p>
      ) : !posts?.length ? (
        <Card className="mt-8">
          <CardContent className="pt-6">
            <p className="text-emerald-800/80">No notices yet.</p>
          </CardContent>
        </Card>
      ) : (
        <ul className="mt-8 space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <h2 className="font-semibold text-emerald-900">{post.title}</h2>
                <p className="text-sm text-emerald-800/70">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </CardHeader>
              {post.body && (
                <CardContent>
                  <p className="text-emerald-800 whitespace-pre-wrap">{post.body}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
