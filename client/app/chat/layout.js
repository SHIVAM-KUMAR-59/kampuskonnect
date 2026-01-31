"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChatSidebar from "@/component/chat/ChatSidebar";
import api from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/context/ToastContext";
import { getSocket } from "@/utils/socket";
import { Loader2 } from "lucide-react";

// Cache data outside component to persist across navigations
let cachedConversations = null;
let cachedConnections = null;

function ChatLayoutContent({ children }) {
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
  const socket = getSocket();

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
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    } finally {
      setFetching(false);
    }
  };

  const handleStartChat = async (user) => {
    try {
      // Check if chat already exists with this user
      const existingChat = conversations.find((chat) => {
        const chatUser = session?.user?.role === "ALUMNI" ? chat.student : chat.alumni;
        return chatUser?.id === user.id;
      });

      // If chat exists, just navigate to it
      if (existingChat) {
        setShowSearch(false);
        setSearchQuery("");
        socket.emit("join", session?.user?.id, existingChat.id);
        router.push(`/chat?id=${existingChat.id}`);
        return;
      }

      // Create new chat if doesn't exist
      const response = await api.post("/chat/", {
        targetUserId: user.id,
        targetUserRole: user.role,
      });

      // Add new chat to cache
      const newChat = response.data.chat;
      cachedConversations = [newChat, ...(cachedConversations || [])];
      setConversations(cachedConversations);

      // Clear search state
      setShowSearch(false);
      setSearchQuery("");

      socket.emit("join", session?.user?.id, newChat.id);
      router.push(`/chat?id=${response.data.chat.id}`);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    }
  };

  const handleSelectChat = (chatId) => {
    socket.emit("join", session?.user?.id, chatId);
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
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function ChatLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-gray-50">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
        </div>
      }
    >
      <ChatLayoutContent>{children}</ChatLayoutContent>
    </Suspense>
  );
}