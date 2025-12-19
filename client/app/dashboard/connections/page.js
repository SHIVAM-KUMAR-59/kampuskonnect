"use client";

export default function ConnectionsPage() {
  const dummyConnections = [
    { name: "Amit Kumar", role: "Alumni", domain: "Backend Developer" },
    { name: "Sneha Singh", role: "Student", domain: "AI/ML" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Connections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dummyConnections.map((user, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow"
          >
            <p className="font-medium text-neutral-800">{user.name}</p>
            <p className="text-sm text-neutral-500">{user.role}</p>
            <p className="text-sm text-green-600">{user.domain}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
