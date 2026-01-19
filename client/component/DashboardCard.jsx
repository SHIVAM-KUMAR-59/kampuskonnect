export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-sm text-neutral-500">{title}</p>
      <p className="text-2xl font-semibold text-neutral-800 mt-1">{value}</p>
    </div>
  );
}
