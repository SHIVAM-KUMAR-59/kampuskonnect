"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  User,
  CalendarPlus,
} from "lucide-react";

export default function Sidebar() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      <h2 className="text-xl font-semibold text-green-600 mb-8">
        KampusKonnect
      </h2>

      <nav className="space-y-2">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" />
        <SidebarItem icon={Users} label="Connections" href="/dashboard/connections" />
        <SidebarItem icon={User} label="Profile" href="/dashboard/profile" />

        {role === "ALUMNI" && (
          <SidebarItem icon={CalendarPlus} label="Post Event" href="/dashboard/events" />
        )}
      </nav>
    </aside>
  );
}

function SidebarItem({ icon: Icon, label, href }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 hover:bg-green-50 hover:text-green-600 transition"
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
