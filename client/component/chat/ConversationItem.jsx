export default function ConversationItem({ convo, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
        selected ? "bg-green-50 border-l-4 border-green-600" : "hover:bg-gray-50"
      }`}
    >
      <img
        src={convo.user.profileImage || "/default-avatar.png"}
        className="w-12 h-12 rounded-full"
      />

      <div className="flex-1 min-w-0 text-left">
        <div className="flex justify-between">
          <p className="font-medium truncate">{convo.user.name}</p>
          <span className="text-xs text-gray-500">
            {new Date(convo.lastMessageTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
      </div>
    </button>
  );
}
