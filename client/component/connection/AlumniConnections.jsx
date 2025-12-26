import React, { Activity, useState } from "react";
import SectionCard from "../SectionCard";
import CurrentConnections from "./CurrentConnections";
import PendingRequests from "./PendingRequests";

const AlumniConnections = () => {
  const [activeTab, setActiveTab] = useState("current");
  return (
    <SectionCard>
      <div className="inline-flex rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-5 py-2.5 text-sm font-medium transition cursor-pointer
      ${activeTab === "current" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
        >
          Current Connections
        </button>

        <button
          onClick={() => setActiveTab("pending")}
          className={`px-5 py-2.5 text-sm font-medium transition cursor-pointer
      ${activeTab === "pending" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
        >
          Pending Requests
        </button>
      </div>

      <Activity mode={activeTab === "current" ? "visible" : "hidden"}>
        <CurrentConnections role={"alumni"} />
      </Activity>

      <Activity mode={activeTab === "pending" ? "visible" : "hidden"}>
        <PendingRequests />
      </Activity>
    </SectionCard>
  );
};

export default AlumniConnections;
