import { Link } from "lucide-react";

export default function EventCard({ title, date }) {
  return (
    <Link href="/dashboard/events">
    <div className="border border-neutral-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
      <p className="font-medium text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{date}</p>
    </div>
    </Link>
  );
}
