"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatSidebar from "@/component/chat/ChatSidebar";
import ChatLayout from "@/component/chat/ChatLayout";
import api from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/context/ToastContext";
import { Loader2 } from "lucide-react";

// Use the same cache as the main chat page
let cachedConversations = null;
let cachedConnections = null;

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.id;
  
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const [conversations, setConversations] = useState(cachedConversations || []);
  const [connections, setConnections] = useState(cachedConnections || []);
  const [fetching, setFetching] = useState(false);
  const [loadingChat, setLoadingChat] = useState(true);
  const { error } = useToast();

  console.log("Chat ID:", chatId);

  const fetchData = async () => {
    if (cachedConversations && cachedConnections) {
      return;
    }

    try {
      setFetching(true);
      const [conversationsRes, connectionsRes] = await Promise.all([
        api.get("/chat"),
        api.get(`/${session?.user?.role.toLowerCase()}/chat`),
      ]);
      
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

  const fetchChatDetails = async () => {
    try {
      setLoadingChat(true);
      const [chatRes, messagesRes] = await Promise.all([
        api.get(`/chat/${chatId}`),
        api.get(`/chat/${chatId}/messages`),
      ]);
      
      setSelectedChat(chatRes.data.chat);
      setMessages(messagesRes.data.messages);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to load chat";
      error(errorMessage);
    //   router.push("/chat");
    } finally {
      setLoadingChat(false);
    }
  };

  const handleStartChat = async (user) => {
    try {
      const response = await api.post("/chat", {
        targetUserId: user.id,
        targetUserRole: user.role,
      });
      
      const newChat = response.data.chat;
      cachedConversations = [newChat, ...(cachedConversations || [])];
      setConversations(cachedConversations);
      
      router.push(`/chat/${response.data.chat.id}`);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    }
  };

  const handleSelectChat = (newChatId) => {
    router.push(`/chat/${newChatId}`);
  };

  const handleRefresh = async () => {
    cachedConversations = null;
    cachedConnections = null;
    await fetchData();
  };

  const handleBack = () => {
    router.push("/chat");
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  useEffect(() => {
    if (chatId && session) {
      fetchChatDetails();
    }
  }, [chatId, session]);

  if (loadingChat) {
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
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
        </div>
      </div>
    );
  }

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

      {selectedChat && (
        <ChatLayout
          chat={selectedChat}
          messages={messages}
          onBack={handleBack}
        />
      )}
    </div>
  );
}