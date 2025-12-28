"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ChatLayout from "@/component/chat/ChatLayout";
import api from "@/utils/axios";
import { useToast } from "@/context/ToastContext";
import { Loader2 } from "lucide-react";

export default function ChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatId = searchParams.get("id");

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { error } = useToast();

  const fetchChatDetails = async () => {
    if (!chatId) return;

    try {
      setLoading(true);
      const response = await api.get(`/chat/${chatId}`);
      console.log("Chat details:", response.data);

      setSelectedChat(response.data.chat.chat);
      setMessages(response.data.chat.messages);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to load chat";
      error(errorMessage);
      router.push("/chat");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/chat");
  };

  useEffect(() => {
    if (chatId) {
      fetchChatDetails();
    }
  }, [chatId]);

  if (!chatId) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
      </div>
    );
  }

  if (!selectedChat) {
    return null;
  }

  return <ChatLayout chat={selectedChat} messages={messages} onBack={handleBack} />;
}
