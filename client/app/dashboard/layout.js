"use client";

import Sidebar from "@/component/Sidebar";
import { ToastProvider } from "@/context/ToastContext";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <main className="p-6 md:p-8">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
