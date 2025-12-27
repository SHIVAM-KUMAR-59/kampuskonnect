"use client";

import { useState } from "react";
import ChatSidebar from "@/component/chat/ChatSidebar";
import ChatLayout from "@/component/chat/ChatLayout";
import { mockConversations, mockConnections, mockMessages } from "@/component/chat/mockData";

export default function Page() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen">
      <ChatSidebar
        conversations={mockConversations}
        connections={mockConnections}
        selectedChat={selectedChat}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectChat={setSelectedChat}
        onStartChat={(user) => setSelectedChat({ user, lastMessage: null })}
      />

      {selectedChat && (
        <ChatLayout
          chat={selectedChat}
          messages={mockMessages}
          onBack={() => setSelectedChat(null)}
        />
      )}
    </div>
  );
}
