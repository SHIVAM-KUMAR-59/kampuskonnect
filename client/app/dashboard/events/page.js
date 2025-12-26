"use client";

import PageIntro from "@/component/PageIntro";
import SectionCard from "@/component/SectionCard";
import EventSkeleton from "@/component/skeleton/EventSkeleton";
import { useToast } from "@/context/ToastContext";
import api from "@/utils/axios";
import { formatDateWithDay, formatDate, formatTime } from "@/utils/util";
import { Loader2, Calendar, Clock, MapPin, IndianRupee } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { error } = useToast();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get("/event");
      setEvents(response.data.events || []);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <EventSkeleton />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 pb-12">
      <PageIntro title="Events" subtitle="Discover and participate in events curated for you" />

      <SectionCard>
        {events.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No events available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition flex flex-col h-full"
              >
                {/* Banner */}
                <div className="relative h-40 w-full shrink-0">
                  <Image
                    src={event.bannerImage || "/placeholder.png"}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />

                  {/* Mode Badge */}
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full
                    ${event.mode === "ONLINE" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                  >
                    {event.mode}
                  </span>
                </div>

                {/* Content - flex-grow to push deadline to bottom */}
                <div className="p-4 flex flex-col grow">
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-3">
                    {event.name}
                  </h2>

                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{event.description}</p>

                  {/* Meta - takes remaining space */}
                  <div className="space-y-2 text-sm text-gray-700 mb-4 grow">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500 flexhrink-0" />
                      <span>{formatDateWithDay(event.date)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                      <span>
                        {formatTime(event.startTime)} – {formatTime(event.endTime)} ·{" "}
                        {Math.floor(event.duration / 60)}h {event.duration % 60}m
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                      <span>{event.venue || "Online"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-gray-500 shrink-0" />
                      <span>
                        {event.registrationFee > 0 ? `₹${event.registrationFee}` : "Free"}
                      </span>
                    </div>
                  </div>

                  {/* Deadline - always at bottom */}
                  <p className="text-xs text-red-600 font-medium mt-auto pt-2 border-t border-gray-100">
                    Registration closes on {formatDate(event.deadline)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </main>
  );
};

export default Page;
