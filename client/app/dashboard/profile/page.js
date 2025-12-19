"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Profile</h1>

      <ProfileItem label="Name" value={session?.user?.name || "—"} />
      <ProfileItem label="Email" value={session?.user?.email} />
      <ProfileItem label="Role" value={session?.user?.role} />
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
