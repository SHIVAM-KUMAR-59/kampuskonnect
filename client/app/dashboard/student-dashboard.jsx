"use client";

import DashboardCard from "@/component/DashboardCard";
import EventCard from "@/component/EventCard";
import PrimaryButton from "@/component/PrimaryButton";

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-neutral-800">
        Welcome back 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Connections" value="12" />
        <DashboardCard title="Pending Requests" value="3" />
        <DashboardCard title="Upcoming Events" value="5" />
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <PrimaryButton text="Find Alumni" />
          <PrimaryButton text="Request Mentorship" />
          <PrimaryButton text="Explore Domains" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EventCard />
          <EventCard />
        </div>
      </div>
    </div>
  );
}
