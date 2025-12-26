"use client";

import { useToast } from "@/context/ToastContext";
import api from "@/utils/axios";
import React, { useEffect, useState } from "react";
import ConnectionSkeleton from "../skeleton/ConnectionSkeleton";

const CurrentConnections = ({ role }) => {
  const [connections, setConnections] = useState([]);
  const [fetching, setFetching] = useState(false)
  const { error } = useToast()
  const fetchConnections = async () => {
    try {
        setFetching(true)
      const connections = await api.get(`/${role}/connections`);
      setConnections(connections.data.data);
      console.log(connections);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    } finally {
        setFetching(false)
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (fetching) {
    <ConnectionSkeleton/>
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
      <h1 className="text-2xl font-semibold text-gray-900">You have 5 Connections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((_, i) => (
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
            <div className="h-20 w-full bg-gray-200 rounded-md" />
            <div className="h-5 w-32 bg-gray-200 rounded-md" />
            <div className="h-5 w-32 bg-gray-200 rounded-md" />
            <div className="h-5 w-32 bg-gray-200 rounded-md" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurrentConnections;
