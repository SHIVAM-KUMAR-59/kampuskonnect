import { Search, X, RefreshCw } from "lucide-react";
import ConversationItem from "./ConversationItem";
import ConnectionItem from "./ConnectionItem";
import PrimaryButton from "../PrimaryButton";
import ChatSkeleton from "../skeleton/ChatSkeleton";

export default function ChatSidebar({
  fetching,
  conversations,
  connections,
  showSearch,
  setShowSearch,
  searchQuery,
  setSearchQuery,
  onSelectChat,
  onStartChat,
  onRefresh,
  role,
}) {
  const filteredConnections = connections.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Clear search query when closing search
  const handleToggleSearch = () => {
    if (showSearch) {
      setSearchQuery(""); // Clear search when closing
    }
    setShowSearch(!showSearch);
  };

  return (
    <div className="flex flex-col w-full lg:w-96 border-r bg-white">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title="Refresh conversations"
            >
              <RefreshCw className={`w-5 h-5 ${fetching ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleToggleSearch}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {showSearch && (
          <input
            className="w-full mt-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        )}
      </div>

      {!fetching ? (
        <div className="flex-1 overflow-y-auto p-2">
          {showSearch ? (
            // Show search results
            filteredConnections.length > 0 ? (
              filteredConnections.map((c) => (
                <ConnectionItem key={c.id} user={c} onClick={() => onStartChat(c)} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500">No connections found</p>
              </div>
            )
          ) : conversations.length > 0 ? (
            // Show conversations
            conversations.map((c) => (
              <ConversationItem
                key={c.id}
                convo={role === "ALUMNI" ? c.student : c.alumni}
                selected={false}
                lastMessage={c.lastMessage}
                onClick={() => onSelectChat(c.id)}
              />
            ))
          ) : (
            // Empty state
            <div className="flex flex-col items-center justify-center h-full px-4">
              <p className="text-gray-500 text-center">No conversations found</p>
              <p className="text-sm text-gray-400 mt-2 text-center">
                Start a conversation with your connections
              </p>
              <PrimaryButton
                onClick={handleToggleSearch}
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