"use client"

export default function StatCard({ label, value, context }) {
  return (
    <div className="relative group animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-white border border-gray-200 rounded-2xl px-8 py-8 overflow-hidden transition-all duration-300 group-hover:border-green-300 group-hover:shadow-lg group-hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />

        <div className="relative space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600">{label}</p>
          <p className="text-5xl font-bold text-gray-900">{value}</p>
          {context && <p className="text-sm text-gray-500 font-medium">{context}</p>}
        </div>
      </div>
    </div>
  )
}
