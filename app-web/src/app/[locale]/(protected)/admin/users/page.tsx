"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { ROLES } from "~/lib/auth/roles";

const ROLE_OPTIONS = [
  { value: ROLES.RESIDENT, label: "Resident" },
  { value: ROLES.CREW, label: "Crew" },
  { value: ROLES.AMBASSADOR, label: "Ambassador" },
  { value: ROLES.ADMIN, label: "Admin" },
] as const;

type UserToEdit = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
};

export default function AdminUsersPage() {
  const { data: session } = api.auth.getSession.useQuery();
  const { data: users, isLoading } = api.admin.listUsers.useQuery();
  const [editingUser, setEditingUser] = useState<UserToEdit | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState<string>(ROLES.RESIDENT);

  const currentUserId = session?.user?.id;
  const utils = api.useUtils();
  const updateMutation = api.admin.updateUser.useMutation({
    onSuccess: () => {
      void utils.admin.listUsers.invalidate();
      closeEditDialog();
    },
    onError: (err) => alert(err.message),
  });
  const deleteMutation = api.admin.deleteUser.useMutation({
    onSuccess: () => void utils.admin.listUsers.invalidate(),
    onError: (err) => alert(err.message),
  });

  const closeEditDialog = () => {
    setEditingUser(null);
    setFormName("");
    setFormEmail("");
    setFormRole(ROLES.RESIDENT);
  };

  const openEdit = (u: { id: string; name: string | null; email: string | null; role: string | null }) => {
    setEditingUser({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
    });
    setFormName(u.name ?? "");
    setFormEmail(u.email ?? "");
    setFormRole(u.role ?? ROLES.RESIDENT);
  };

  const handleSave = () => {
    if (!editingUser) return;
    updateMutation.mutate({
      id: editingUser.id,
      name: formName || undefined,
      email: formEmail.trim() ? formEmail.trim() : null,
      role: formRole as "resident" | "crew" | "ambassador" | "admin",
    });
  };

  const handleDelete = (user: { id: string; name: string | null; email: string | null }) => {
    if (user.id === currentUserId) {
      alert("You cannot delete your own account.");
      return;
    }
    const label = user.name ?? user.email ?? "This user";
    if (window.confirm(`Delete ${label}? This will remove all their data and cannot be undone.`)) {
      deleteMutation.mutate({ id: user.id });
    }
  };

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
                <th className="p-3 text-right">Actions</th>
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
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(u)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        disabled={u.id === currentUserId || deleteMutation.isPending}
                        onClick={() => handleDelete(u)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit User Dialog */}
      <Transition appear show={!!editingUser} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeEditDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md rounded-xl border border-emerald-200 bg-white p-6 shadow-lg">
                  <Dialog.Title className="text-lg font-semibold text-emerald-900">
                    Edit user
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-emerald-800/80">
                    Update name, email, or role.
                  </Dialog.Description>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-emerald-800">
                        Name
                      </label>
                      <Input
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Display name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-emerald-800">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-emerald-800">
                        Role
                      </label>
                      <select
                        value={formRole}
                        onChange={(e) => setFormRole(e.target.value)}
                        className="flex h-10 w-full rounded-lg border border-emerald-600 bg-white px-4 py-2 text-base text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      >
                        {ROLE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline" onClick={closeEditDialog}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? "Saving…" : "Save"}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
