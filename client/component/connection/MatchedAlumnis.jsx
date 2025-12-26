"use client";

import api from "@/utils/axios";
import { getAvatar } from "@/utils/util";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Briefcase, Calendar, Linkedin, Loader2, UserPlus } from "lucide-react";
import ConnectionSkeleton from "../skeleton/ConnectionSkeleton";
import Link from "next/link";
import PrimaryButton from "../PrimaryButton";
import { useToast } from "@/context/ToastContext";

const MatchedAlumnis = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState(null);
  const { success, error } = useToast();

  const fetchMatches = async () => {
    try {
      const response = await api.get("/student/match");
      setMatches(response.data?.data || []);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = async (alumniId) => {
    try {
      setSendingId(alumniId);
      await api.post(`/student/connect/${alumniId}`);
      setMatches((prev) => prev.map((m) => (m._id === alumniId ? { ...m, requested: true } : m)));
      success("Request sent successfully");
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
      console.error(err);
    } finally {
      setSendingId(null);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  if (loading) {
    return <ConnectionSkeleton />;
  }

  if (!matches || !matches.length || matches.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">No alumni matched your interests yet.</div>
    );
  }

  return (
    <section className="space-y-6 mt-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Found {matches.length} Match{matches.length > 1 ? "es" : ""} based on your interests
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              {match.profileImage ? (
                <Image
                  src={match.profileImage}
                  alt={match.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
              ) : (
                <p className="w-8 h-8 xl:w-10 xl:h-10 p-2 rounded-full bg-green-50 border border-green-300 flex items-center justify-center text-green-700 font-bold">
                  {getAvatar(match.name)}
                </p>
              )}

              <div>
                <p className="font-semibold text-gray-900">{match.name}</p>
                <p className="text-sm text-gray-500">{match.email}</p>
              </div>
            </div>

            {/* Bio */}
            {match.bio && <p className="text-sm text-gray-600 mt-3 line-clamp-3">{match.bio}</p>}

            {/* Meta */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Passout Year: {match.passoutYear}
              </div>

              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {match.currentCompany || "Not specified"}
              </div>

              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                {match.experience} years experience
              </div>

              {match.linkedinUrl && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <Link href={match.linkedinUrl} className="max-w-sm truncate line-clamp-1">
                    {match.linkedinUrl}
                  </Link>
                </div>
              )}
            </div>

            {/* Action */}
            <PrimaryButton
              disabled={match.requested || sendingId === match.id}
              onClick={() => sendRequest(match.id)}
              classname={`mt-5 w-full py-2.5 rounded-xl transition
                ${match.requested && "bg-gray-100 text-gray-400 cursor-not-allowed"}
              `}
              text={
                sendingId === match.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </span>
                ) : match.requested ? (
                  "Request Sent"
                ) : (
                  "Send Connection Request"
                )
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MatchedAlumnis;
