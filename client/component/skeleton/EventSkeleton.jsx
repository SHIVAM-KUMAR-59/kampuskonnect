import React from "react";
import SectionCard from "../SectionCard";
import PageIntro from "../PageIntro";

const EventSkeleton = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 pb-12">
      <PageIntro title="Events" subtitle="Discover and participate in events curated for you" />

      <SectionCard>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border border-white rounded-xl bg-gray-200 animate-pulse flex flex-col gap-3 h-full p-4"
            >
              <div className="h-40 w-full shrink-0 relative">
                <div className="absolute top-3 right-3 h-6 w-15 rounded-full bg-gray-300" />
              </div>
              <div className="h-6 w-full bg-gray-300 rounded-lg" />
              <div className="h-20 w-full bg-gray-300 rounded-lg" />
              <div className="h-6 w-30 bg-gray-300 rounded-lg" />
              <div className="h-6 w-30 bg-gray-300 rounded-lg" />
              <div className="h-6 w-30 bg-gray-300 rounded-lg" />
              <div className="h-6 w-30 bg-gray-300 rounded-lg" />
              <div className="h-6 w-full bg-gray-300 rounded-lg mt-5" />
            </div>
          ))}
        </div>
      </SectionCard>
    </main>
  );
};

export default EventSkeleton;
