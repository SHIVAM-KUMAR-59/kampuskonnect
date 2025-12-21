import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <input
          placeholder="Search mentors or events"
          className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none"
        />

        <Bell className="text-gray-600 cursor-pointer" />

        <div className="w-9 h-9 bg-green-600 rounded-full" />
      </div>
    </header>
  );
}
