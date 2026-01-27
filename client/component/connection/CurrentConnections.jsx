"use client";

import { useToast } from "@/context/ToastContext";
import api from "@/utils/axios";
import React, { useEffect, useState } from "react";
import ConnectionSkeleton from "../skeleton/ConnectionSkeleton";
import Image from "next/image";
import { getAvatar } from "@/utils/util";
import { Briefcase, Calendar, Linkedin, Loader2, UserPlus } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "../PrimaryButton";

const CurrentConnections = ({ role }) => {
  const [connections, setConnections] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const { error } = useToast();
  const fetchConnections = async () => {
    try {
      setFetching(true);
      const response = await api.get(`/${role}/connections`);
      setConnections(response.data.connections);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    } finally {
      setFetching(false);
    }
  };

  const handleMessageClick = async (id, role) => {
    try {
      setMessageLoading(true);
      const response = await api.post("/chat", {
        targetUserId: id,
        targetUserRole: role
      })
      window.location.href = `/chat?id=${response.data.chat.id}`;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    } finally {
      setMessageLoading(false);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (fetching) {
    <ConnectionSkeleton />;
  }

  if (!connections || !connections.length || connections.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        You have no connections yet, connect with an alumni to grow your network.
      </div>
    );
  }
  return (
    <section className="space-y-6 mt-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        You have {connections.length} Connections
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              {connection.profileImage ? (
                <Image
                  src={connection.profileImage}
                  alt={connection.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
              ) : (
                <p className="w-8 h-8 xl:w-10 xl:h-10 p-2 rounded-full bg-green-50 border border-green-300 flex items-center justify-center text-green-700 font-bold">
                  {getAvatar(connection.name)}
                </p>
              )}

              <div>
                <p className="font-semibold text-gray-900">{connection.name}</p>
                <p className="text-sm text-gray-500">{connection.email}</p>
              </div>
            </div>

            {/* Bio */}
            {connection.bio && (
              <p className="text-sm text-gray-600 mt-3 line-clamp-3">{connection.bio}</p>
            )}

            {/* Meta */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              {connection.role === "ALUMNI" && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Passout Year: {connection.passoutYear}
                </div>
              )}

              {connection.role === "ALUMNI" && (
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {connection.currentCompany || "Not specified"}
                </div>
              )}

              {connection.role === "ALUMNI" && (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  {connection.experience} years experience
                </div>
              )}

              {connection.linkedinUrl && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <Link
                    target="_blank"
                    href={connection.linkedinUrl}
                    className="max-w-sm truncate line-clamp-1 hover:text-blue-600 transition-all duration-200"
                  >
                    {connection.linkedinUrl}
                  </Link>
                </div>
              )}

              {connection.role === "STUDENT" && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {connection.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action */}
            <PrimaryButton onClick={() => handleMessageClick(connection.id, connection.role)} classname={`mt-5 w-full py-2.5 rounded-xl transition`} disabled={messageLoading} text={messageLoading ? "Loading.." : "Message"} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurrentConnections;
