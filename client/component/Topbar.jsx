"use client";

import { useSession, signOut } from "next-auth/react";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <p className="text-sm text-neutral-600">
        {session?.user?.role === "STUDENT"
          ? "Student Dashboard"
          : "Alumni Dashboard"}
      </p>

      <button
        onClick={() => signOut()}
        className="text-sm text-red-500 hover:underline"
      >
        Logout
      </button>
    </header>
  );
}
