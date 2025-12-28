"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChatSidebar from "@/component/chat/ChatSidebar";
import api from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/context/ToastContext";

// Cache data outside component to persist across navigations
let cachedConversations = null;
let cachedConnections = null;

export default function ChatLayout({ children }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const [conversations, setConversations] = useState(cachedConversations || []);
  const [connections, setConnections] = useState(cachedConnections || []);
  const [fetching, setFetching] = useState(false);
  const { error } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFetched = useRef(false);

  const selectedChatId = searchParams.get("id");

  const fetchData = async () => {
    // Don't fetch if we already have cached data
    if (cachedConversations && cachedConnections) {
      setConversations(cachedConversations);
      setConnections(cachedConnections);
      return;
    }

    try {
      setFetching(true);
      const [conversationsRes, connectionsRes] = await Promise.all([
        api.get("/chat"),
        api.get(`/${session?.user?.role.toLowerCase()}/connections`),
      ]);

      // Cache the data
      cachedConversations = conversationsRes.data.chats;
      cachedConnections = connectionsRes.data.connections;

      setConversations(cachedConversations);
      setConnections(cachedConnections);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Something went wrong";
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
      });

      // Add new chat to cache
      const newChat = response.data.chat;
      cachedConversations = [newChat, ...(cachedConversations || [])];
      setConversations(cachedConversations);

      // Navigate with search params
      router.push(`/chat?id=${response.data.chat.id}`);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    }
  };

  const handleSelectChat = (chatId) => {
    router.push(`/chat?id=${chatId}`);
  };

  // Manual refresh function
  const handleRefresh = async () => {
    // Clear cache
    cachedConversations = null;
    cachedConnections = null;
    hasFetched.current = false;

    // Fetch fresh data
    await fetchData();
  };

  useEffect(() => {
    if (session && !hasFetched.current) {
      hasFetched.current = true;
      fetchData();
    }
  }, [session]);

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar
        fetching={fetching}
        conversations={conversations}
        connections={connections}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectChat={handleSelectChat}
        onStartChat={handleStartChat}
        onRefresh={handleRefresh}
        role={session?.user?.role}
        selectedChatId={selectedChatId}
      />

      {/* Main content area */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}