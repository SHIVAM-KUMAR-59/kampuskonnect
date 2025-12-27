"use client";

import { useEffect, useState, useRef } from "react";
import ChatSidebar from "@/component/chat/ChatSidebar";
import api from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";

// Cache data outside component to persist across navigations
let cachedConversations = null;
let cachedConnections = null;

export default function Page() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const [conversations, setConversations] = useState(cachedConversations || []);
  const [connections, setConnections] = useState(cachedConnections || []);
  const [fetching, setFetching] = useState(false);
  const { error } = useToast();
  const router = useRouter();
  const hasFetched = useRef(false);

  const fetchData = async () => {
    // Don't fetch if we already have cached data
    if (cachedConversations && cachedConnections) {
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
      });
      
      // Add new chat to cache
      const newChat = response.data.chat;
      cachedConversations = [newChat, ...(cachedConversations || [])];
      setConversations(cachedConversations);
      
      router.push(`/chat/${response.data.chat.id}`);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    }
  };

  const handleSelectChat = (chatId) => {
    router.push(`/chat/${chatId}`);
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
      />

      {/* Empty state when no chat selected (desktop only) */}
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
          <p className="text-gray-500">Choose a conversation from the sidebar to start chatting</p>
        </div>
      </div>
    </div>
  );
}