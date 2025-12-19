"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

export default function EventCard({ event }) {
  if (!event) return null;

  const {
    title = "Untitled Event",
    description = "Event details will be updated soon.",
    date = "TBA",
    location = "Online",
    image,
  } = event;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition">
      <div className="relative w-full h-44">
        <Image
          src={image || "/event-placeholder.jpg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-neutral-800 line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-neutral-600 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-4 text-xs text-neutral-500 pt-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
