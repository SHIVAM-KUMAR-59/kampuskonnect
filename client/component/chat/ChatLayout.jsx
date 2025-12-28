import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout({ chat, messages, onBack }) {
  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader user={chat.user} onBack={onBack} />
      <ChatMessages messages={messages} myId="me" />
      <ChatInput onSend={(msg) => console.log("send:", msg)} />
    </div>
  );
}
