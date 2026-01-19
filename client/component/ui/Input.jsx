export function Input({ label, icon, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2 border rounded-xl px-3 py-2 ouline-none border-gray-400">
        {icon}
        <input {...props} className="w-full outline-none text-sm bg-transparent" />
      </div>
    </div>
  );
}

export function Textarea({ label, ...props }) {
  return (
    <div className="sm:col-span-2 space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full border border-gray-400 rounded-xl px-3 py-2 text-sm outline-none"
      />
    </div>
  );
}
