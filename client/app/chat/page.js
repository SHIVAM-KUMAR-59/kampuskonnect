"use client";

import { useEffect, useState } from "react";
import ChatSidebar from "@/component/chat/ChatSidebar";
import ChatLayout from "@/component/chat/ChatLayout";
import { mockMessages } from "@/component/chat/mockData";
import api from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/context/ToastContext";

export default function Page() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const [conversations, setConversations] = useState([]);
  const [connections, setConnections] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { error } = useToast();

  const fetchData = async () => {
    try {
      setFetching(true);
      const [conversationsRes, connectionsRes] = await Promise.all([
        api.get("/chat"),
        api.get(`/${session?.user?.role}/connections`),
      ]);
      setConversations(conversationsRes.data.chats);
      setConnections(connectionsRes.data.connections);
      console.log("data", conversationsRes.data, connectionsRes.data);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  return (
    <div className="flex h-screen">
      <ChatSidebar
        fetching={fetching}
        conversations={conversations}
        connections={connections}
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
