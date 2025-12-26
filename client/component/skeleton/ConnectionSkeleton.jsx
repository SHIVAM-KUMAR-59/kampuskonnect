import React from "react";

const ConnectionSkeleton = () => {
  return (
    <div className="space-y-6 mt-8">
      <div className="h-5 w-64 bg-gray-200 rounded-md animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border-gray-200  bg-white animate-pulse flex flex-col gap-3 border rounded-2xl p-5"
          >
            <div className="flex gap-3">
              <div className="w-8 h-8 xl:w-10 xl:h-10 p-2 rounded-full bg-gray-200" />
              <div className="flex flex-col gap-2">
                <div className="h-5 w-32 bg-gray-200 rounded-md" />
                <div className="h-5 w-32 bg-gray-200 rounded-md" />
              </div>
            </div>
            <div className="h-10 w-full bg-gray-200 rounded-md" />
            <div className="h-5 w-32 bg-gray-200 rounded-md" />
            <div className="h-5 w-32 bg-gray-200 rounded-md" />
            <div className="h-5 w-32 bg-gray-200 rounded-md" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionSkeleton;
