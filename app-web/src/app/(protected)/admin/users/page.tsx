"use client";

import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function AdminUsersPage() {
  const { data: users, isLoading } = api.admin.listUsers.useQuery();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-emerald-900">Users</h1>
      <p className="mt-2 text-emerald-800/80">Manage user accounts.</p>

      {isLoading ? (
        <p className="mt-8 text-emerald-800/80">Loading…</p>
      ) : !users?.length ? (
        <Card className="mt-8">
          <CardContent className="pt-6">
            <p className="text-emerald-800/80">No users yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-emerald-200 text-left text-emerald-800">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-emerald-100">
                  <td className="p-3">{u.name ?? "—"}</td>
                  <td className="p-3">{u.email ?? "—"}</td>
                  <td className="p-3">
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-800">
                      {u.role ?? "—"}
                    </span>
                  </td>
                  <td className="p-3">{u.engagementScore ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
