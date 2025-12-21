export default function EventCard({ title, date }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
      <p className="font-medium text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{date}</p>
    </div>
  );
}
