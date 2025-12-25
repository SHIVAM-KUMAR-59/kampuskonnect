"use client";

export default function ConnectionsPage() {
  const dummyConnections = [
    { name: "Amit Kumar", role: "Alumni", domain: "Backend Developer" },
    { name: "Sneha Singh", role: "Student", domain: "AI / ML" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Connections</h1>
        <p className="text-sm text-gray-500 mt-1">
          People you are connected with on KampusKonnect
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyConnections.map((user, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-6 hover:shadow-sm transition"
          >
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500 mt-1">{user.role}</p>
            <p className="text-sm text-green-600 mt-2">{user.domain}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
