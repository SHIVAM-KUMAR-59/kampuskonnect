export default function ChatMessages({ messages, myId }) {
  console.log("messages", messages);
  console.log("my ID", myId);
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.map((msg) => {
        const isMe = msg.sender === myId;
        return (
          <div key={msg.id} className={`flex my-1 ${isMe ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs ${
                isMe ? "bg-green-600 text-white" : "bg-white border"
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs opacity-70">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
