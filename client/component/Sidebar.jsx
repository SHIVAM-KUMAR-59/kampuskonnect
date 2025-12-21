import {
  LayoutDashboard,
  Users,
  Calendar,
  User,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r px-6 py-8 hidden md:block">
      <h1 className="text-xl font-bold text-green-600 mb-10">
        KampusKonnect
      </h1>

      <nav className="space-y-2">
        <Item icon={<LayoutDashboard />} label="Dashboard" />
        <Item icon={<Users />} label="Connections" />
        <Item icon={<Calendar />} label="Events" />
        <Item icon={<User />} label="Profile" />
      </nav>

      <div className="absolute bottom-8">
        <Item icon={<LogOut />} label="Logout" />
      </div>
    </aside>
  );
}

function Item({ icon, label }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
}
