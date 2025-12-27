"use client";

import { useEffect, useState } from "react";
import ChatSidebar from "@/component/chat/ChatSidebar";
import ChatLayout from "@/component/chat/ChatLayout";
import { mockMessages } from "@/component/chat/mockData";
import api from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const [conversations, setConversations] = useState([]);
  const [connections, setConnections] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { error } = useToast();
  const router = useRouter();

  const fetchData = async () => {
    try {
      setFetching(true);
      const [conversationsRes, connectionsRes] = await Promise.all([
        api.get("/chat"),
        api.get(`/${session?.user?.role}/connections`),
      ]);
      setConversations(conversationsRes.data.chats);
      setConnections(connectionsRes.data.connections);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    } finally {
      setFetching(false);
    }
  };

  const handleStartChat = async (user) => {
    try {
      const response = await api.post("/chat", {
        targetUserId: user.id,
        targetUserRole: user.role, 
      })
      console.log(response.data);
      router.push(`/chat/${response.data.chat.id}`);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    }
  }

  const handleSelectChat = (chatId) => {
    console.log(chatId);
    router.push(`/chat/${chatId}`);
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
        onSelectChat={handleSelectChat}
        onStartChat={handleStartChat}
        role={session?.user?.role}
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
