export default function ConnectionItem({ user, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
    >
      <img src={user.profileImage || "/default-avatar.png"} className="w-12 h-12 rounded-full" />
      <div className="text-left">
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </button>
  );
}
