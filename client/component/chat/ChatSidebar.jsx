import { Search, X } from "lucide-react";
import ConversationItem from "./ConversationItem";
import ConnectionItem from "./ConnectionItem";
import PrimaryButton from "../PrimaryButton";
import ChatSkeleton from "../skeleton/ChatSkeleton";

export default function ChatSidebar({
  fetching,
  conversations,
  connections,
  selectedChat,
  showSearch,
  setShowSearch,
  searchQuery,
  setSearchQuery,
  onSelectChat,
  onStartChat,
}) {
  const filteredConnections = connections.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full lg:w-96 border-r bg-white">
      <div className="p-4 border-b">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Messages</h1>
          <button onClick={() => setShowSearch(!showSearch)}>
            {showSearch ? <X /> : <Search />}
          </button>
        </div>

        {showSearch && (
          <input
            className="w-full mt-3 px-3 py-2 border rounded-lg"
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
      </div>

      {!fetching ? (
        <div className="flex-1 overflow-y-auto p-2">
          {showSearch ? (
            filteredConnections.map((c) => (
              <ConnectionItem key={c.id} user={c} onClick={() => onStartChat(c)} />
            ))
          ) : conversations.length > 0 ? (
            conversations.map((c) => (
              <ConversationItem
                key={c.user.id}
                convo={c}
                selected={selectedChat?.user.id === c.user.id}
                onClick={() => onSelectChat(c)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500">No conversations found</p>
              <p className="text-sm text-gray-500 mt-2">
                Start a conversation with your connections
              </p>
              <PrimaryButton
                onClick={() => setShowSearch(!showSearch)}
                text="Start a conversation"
                classname={"mt-4 py-3 px-4"}
              />
            </div>
          )}
        </div>
      ) : (
        <ChatSkeleton />
      )}
    </div>
  );
}
