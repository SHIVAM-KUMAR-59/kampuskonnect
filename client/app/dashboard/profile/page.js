"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your account and role information
        </p>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <ProfileItem label="Name" value={session?.user?.name || "—"} />
        <ProfileItem label="Email" value={session?.user?.email || "—"} />
        <ProfileItem label="Role" value={session?.user?.role || "—"} />
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="flex justify-between py-3 border-b last:border-b-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
