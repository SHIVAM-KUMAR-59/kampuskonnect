"use client";

import AlumniConnections from "@/component/connection/AlumniConnections";
import StudentConnections from "@/component/connection/StudentConnections";
import PageIntro from "@/component/PageIntro";
import { useSession } from "next-auth/react";

export default function ConnectionsPage() {
  const { data: session } = useSession();
  const isAlumni = session?.user?.role === "ALUMNI";

  return (
    <main className="max-w-7xl mx-auto overflow-hidden">
      <PageIntro
        title="Network & Connections"
        subtitle={
          isAlumni
            ? "Manage and grow your professional student network"
            : "Connect with alumni and expand your professional network"
        }
      />

      {isAlumni && <AlumniConnections />}
      {!isAlumni && <StudentConnections />}
    </main>
  );
}
