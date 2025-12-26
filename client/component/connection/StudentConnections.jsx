import React, { Activity, useState } from "react";
import SectionCard from "../SectionCard";
import CurrentConnections from "./CurrentConnections";
import PendingRequests from "./PendingRequests";
import MatchedAlumnis from "./MatchedAlumnis";

const StudentConnections = () => {
  const [activeTab, setActiveTab] = useState("match");
  return (
    <SectionCard>
      <div className="inline-flex rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <button
          onClick={() => setActiveTab("match")}
          className={`px-5 py-2.5 text-sm font-medium transition cursor-pointer
      ${activeTab === "match" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
        >
          Matched Alumnis
        </button>
        <button
          onClick={() => setActiveTab("current")}
          className={`px-5 py-2.5 text-sm font-medium transition cursor-pointer
      ${activeTab === "current" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
        >
          Current Connections
        </button>
      </div>

      <Activity mode={activeTab === "match" ? "visible" : "hidden"}>
        <MatchedAlumnis />
      </Activity>
      <Activity mode={activeTab === "current" ? "visible" : "hidden"}>
        <CurrentConnections role={"student"} />
      </Activity>
    </SectionCard>
  );
};

export default StudentConnections;
