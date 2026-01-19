import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex gap-3 bg-gray-200 p-2 animate-pulse">
          <div className="w-13 h-13 rounded-full bg-gray-300" />
          <div className="flex flex-col gap-3">
            <div className="h-4 w-32 bg-gray-300 rounded-lg" />
            <div className="h-4 w-32 bg-gray-300 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
