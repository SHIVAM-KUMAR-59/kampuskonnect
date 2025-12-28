"use client";

import { MessageCircle } from "lucide-react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChatContent from "@/component/chat/ChatContent";
import { Loader2 } from "lucide-react";

function ChatPageContent() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");

  return (
    <>
      {/* Show empty state when no chat selected */}
      {!chatId && (
        <div className="hidden lg:flex h-full items-center justify-center">
          <div className="text-center">
            <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
            <p className="text-gray-500">
              Choose a conversation from the sidebar to start chatting
            </p>
          </div>
        </div>
      )}

      {/* Chat content - renders when ?id= is present */}
      {chatId && <ChatContent />}
    </>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
        </div>
      }
    >
      <ChatPageContent />
    </Suspense>
  );
}
