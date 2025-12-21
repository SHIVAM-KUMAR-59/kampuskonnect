export default function StatCard({ label, value, context }) {
  return (
    <div className="bg-white border rounded-xl px-6 py-7">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="text-3xl font-semibold text-gray-900 mt-2">
        {value}
      </p>
      {context && (
        <p className="text-xs text-gray-500 mt-2">
          {context}
        </p>
      )}
    </div>
  );
}
