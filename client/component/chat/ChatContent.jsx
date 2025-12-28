"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ChatLayout from "@/component/chat/ChatLayout";
import api from "@/utils/axios";
import { useToast } from "@/context/ToastContext";
import { Loader2 } from "lucide-react";
import { getSocket } from "@/utils/socket";
import { useSession } from "next-auth/react";

export default function ChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatId = searchParams.get("id");

  const { data: session } = useSession();
  const { error } = useToast();

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const socket = getSocket();

  // Fetch chat + messages
  const fetchChatDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/chat/${chatId}`);
      setSelectedChat(response.data.chat.chat);
      setMessages(response.data.chat.messages);
    } catch (err) {
      error("Failed to load chat");
      router.push("/chat");
    } finally {
      setLoading(false);
    }
  };

  // CONNECT SOCKET + JOIN ROOM
  useEffect(() => {
    if (!chatId || !session?.user?.id) return;

    socket.connect();

    socket.emit("join-chat", {
      chatId,
      userId: session.user.id,
    });

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
      socket.disconnect();
    };
  }, [chatId, session?.user?.id]);

  // Send message
  const onSend = (message) => {
    const payload = {
      chatId,
      sender: session.user.id,
      message,
    };

    socket.emit("send-message", payload);

    // optimistic update
    setMessages((prev) => [
      ...prev,
      {
        message,
        sender: session.user.id,
        createdAt: new Date(),
      },
    ]);
  };

  useEffect(() => {
    if (chatId) fetchChatDetails();
  }, [chatId]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!selectedChat) return null;

  return (
    <ChatLayout
      chat={selectedChat}
      messages={messages}
      onBack={() => router.push("/chat")}
      onSend={onSend}
      userId={session.user.id}
    />
  );
}
