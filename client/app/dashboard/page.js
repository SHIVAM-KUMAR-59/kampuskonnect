"use client";

import { useSession } from "next-auth/react";
import StudentDashboard from "./student-dashboard";
import AlumniDashboard from "./alumni-dashboard";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (session?.user?.role === "STUDENT") {
    return <StudentDashboard />;
  }

  if (session?.user?.role === "ALUMNI") {
    return <AlumniDashboard />;
  }

  return null;
}
