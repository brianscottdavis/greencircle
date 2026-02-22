import { Link } from "~/i18n/navigation";

export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-emerald-900">Profile</h1>
      <p className="mt-2 text-emerald-800/80">Manage your account and preferences.</p>
      <div className="mt-6 space-y-2">
        <Link href="/profile/settings" className="block text-emerald-600 hover:underline">
          Settings →
        </Link>
        <Link href="/profile/household" className="block text-emerald-600 hover:underline">
          Household →
        </Link>
      </div>
    </div>
  );
}
