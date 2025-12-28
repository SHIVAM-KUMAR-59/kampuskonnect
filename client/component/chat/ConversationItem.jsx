import Image from "next/image";

export default function ConversationItem({ convo, lastMessage, selected = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
        selected ? "bg-green-50 border-l-4 border-green-600" : "hover:bg-gray-50"
      }`}
    >
      {convo.profileImage ? (
        <Image
          height={48}
          width={48}
          alt="profile"
          src={convo.profileImage || "/default-avatar.png"}
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <p className="w-8 h-8 xl:w-10 xl:h-10 p-2 rounded-full bg-green-50 border border-green-300 flex items-center justify-center text-green-700 font-bold">
          {getAvatar(convo.name)}
        </p>
      )}

      <div className="flex-1 min-w-0 text-left">
        <div className="flex justify-between">
          <p className="font-medium truncate">{convo.name}</p>
          {/* <span className="text-xs text-gray-500">
            {new Date(convo.lastMessageTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span> */}
        </div>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>
    </button>
  );
}
