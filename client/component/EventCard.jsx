import Link from "next/link";


export default function EventCard({ title, date }) {
  return (
    <div className="border border-neutral-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
    <Link href="/dashboard/events">
      <p className="font-medium text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{date}</p>
    </Link>
    </div>
  );
}
