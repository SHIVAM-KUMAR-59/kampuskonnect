"use client";

import DashboardCard from "@/component/DashboardCard";
import EventCard from "@/component/EventCard";
import PrimaryButton from "@/component/PrimaryButton";

export default function AlumniDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-neutral-800">
        Welcome, Alumni 🎓
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Mentees" value="8" />
        <DashboardCard title="Requests" value="4" />
        <DashboardCard title="Events Hosted" value="2" />
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Mentorship</h2>
        <div className="flex gap-4 flex-wrap">
          <PrimaryButton text="View Requests" />
          <PrimaryButton text="Post Event" />
          <PrimaryButton text="Manage Availability" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Your Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EventCard />
          <EventCard />
        </div>
      </div>
    </div>
  );
}
