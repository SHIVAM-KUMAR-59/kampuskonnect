"use client";

import Sidebar from "@/component/Sidebar";
import Topbar from "@/component/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-neutral-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
