export default function ProfileCard({
  name,
  role,
  org,
  skills = [],
  action,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 border rounded-xl p-5 transition-transform duration-200 hover:shadow-md hover:-translate-y-1px">
      {/* Left: Avatar + Info */}
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-medium">
          {name[0]}
        </div>

        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">
            {role} · {org}
          </p>

          {skills.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {skills.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Action */}
      {action && (
        <button className="text-sm px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition self-start sm:self-center">
          {action}
        </button>
      )}
    </div>
  );
}
