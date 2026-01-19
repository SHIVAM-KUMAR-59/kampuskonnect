export function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-8 max-w-4xl">
      <div className="h-12 w-64 bg-gray-200 rounded" />
      <div className="bg-white p-8 rounded-2xl space-y-6">
        <div className="flex gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full" />
          <div className="space-y-3">
            <div className="h-5 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-56 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
