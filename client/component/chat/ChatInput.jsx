"use client";
import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="border-t bg-white p-4 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded-xl px-3 py-2"
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button onClick={submit} className="bg-green-600 text-white p-3 rounded-xl">
        <Send />
      </button>
    </div>
  );
}
