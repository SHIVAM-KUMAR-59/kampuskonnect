"use client";

import api from "@/utils/axios";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import { Briefcase, Calendar, Linkedin, Loader2, UserPlus } from "lucide-react";
import Image from "next/image";
import { getAvatar } from "@/utils/util";
import PendingRequestSkeleton from "../skeleton/PendingRequestSkeleton";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";

const PendingRequests = () => {
  const [fetching, setFetching] = useState(false);
  const [handlingRequest, sethandlingRequest] = useState({
    acceptingRequest: false,
    rejectingRequest: false,
  });
  const [pendingRequests, setPendingRequests] = useState([]);
  const { success, error } = useToast();

  const fetchPendingRequests = async () => {
    try {
      setFetching(true);
      const response = await api.get("/alumni/requests");
      setPendingRequests(response.data.requests);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleRequest = async (requestId, action) => {
    try {
      if (action === "ACCEPTED") {
        sethandlingRequest({ ...handlingRequest, acceptingRequest: true });
        await api.patch("/alumni/requests/handle", {
          requestId,
          action,
        });
        success("Request accepted successfully");
      } else if (action === "REJECTED") {
        sethandlingRequest({ ...handlingRequest, rejectingRequest: true });
        await api.patch("/alumni/requests/handle", {
          requestId,
          action,
        });
        success("Request rejected successfully");
      } else {
        error("Invalid action");
        return;
      }

      fetchPendingRequests();
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    } finally {
      sethandlingRequest({ acceptingRequest: false, rejectingRequest: false });
    }
  };

  if (fetching) {
    return <PendingRequestSkeleton />;
  }

  if (!pendingRequests || !pendingRequests.length || pendingRequests.length === 0) {
    return <div className="text-center py-16 text-gray-500">You have no pending requests</div>;
  }

  return (
    <section className="space-y-6 mt-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        You have {pendingRequests.length} Pending Request{pendingRequests.length > 1 ? "es" : ""}
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pendingRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              {request.profileImage ? (
                <Image
                  src={request.profileImage}
                  alt={request.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
              ) : (
                <p className="w-8 h-8 xl:w-10 xl:h-10 p-2 rounded-full bg-green-50 border border-green-300 flex items-center justify-center text-green-700 font-bold">
                  {getAvatar(request.sender.name)}
                </p>
              )}

              <div>
                <p className="font-semibold text-gray-900">{request.sender.name}</p>
                <p className="text-sm text-gray-500">{request.sender.email}</p>
              </div>
            </div>

            {/* Bio */}
            {request.sender.bio && (
              <p className="text-sm text-gray-600 mt-3 line-clamp-3">{request.sender.bio}</p>
            )}

            {/* Meta */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 hrink-0" />
                {request.sender.linkedinUrl ? (
                  <Link
                    href={request.sender.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-w-sm truncate line-clamp-1 hover:text-blue-600 transition-all duration-200"
                  >
                    {request.sender.linkedinUrl}
                  </Link>
                ) : (
                  <span>Not Specified</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {request.sender.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200"
                >
                  {interest}
                </span>
              ))}
            </div>

            {/* Action */}
            <div className="flex flex-col md:flex-row gap-3 items-center mt-5 w-full">
              <PrimaryButton
                disabled={handlingRequest.acceptingRequest || handlingRequest.rejectingRequest}
                onClick={() => handleRequest(request.id, "ACCEPTED")}
                classname="w-full px-5 py-2.5 rounded-xl transition"
                text={
                  handlingRequest.acceptingRequest ? (
                    <div className="flex items-center justify-center gap-2">
                      <span>Processing...</span>
                      <Loader2 className="animate-spin w-4 h-4" />
                    </div>
                  ) : (
                    "Accept"
                  )
                }
              />

              <button
                disabled={handlingRequest.acceptingRequest || handlingRequest.rejectingRequest}
                onClick={() => handleRequest(request.id, "REJECTED")}
                className="w-full px-5 py-2.5 rounded-xl border border-red-600 text-red-600 font-medium hover:bg-red-100 hover:cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {handlingRequest.rejectingRequest ? (
                  <div className="flex items-center justify-center gap-2">
                    <span>Processing...</span>
                    <Loader2 className="animate-spin w-4 h-4" />
                  </div>
                ) : (
                  "Reject"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PendingRequests;
