import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout({ chat, messages, onBack, onSend, userId }) {
  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader user={chat.receiver} onBack={onBack} />
      <ChatMessages messages={messages} myId={userId} />
      <ChatInput onSend={onSend} />
    </div>
  );
}
