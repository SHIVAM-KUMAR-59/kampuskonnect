"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PageIntro from "@/component/PageIntro";
import StatCard from "@/component/StatCard";
import SectionCard from "@/component/SectionCard";
import ProfileCard from "@/component/ProfileCard";
import EventCard from "@/component/EventCard";
import api from "@/utils/axios";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAlumni = session?.user?.role === "ALUMNI";
  const isStudent = session?.user?.role === "STUDENT";

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const response = await api.get("/user/overview");
      console.log(response.data.user);
      setOverview(response.data.user);
    } catch (err) {
      console.error("Error fetching overview:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchOverview();
    }
  }, [session]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-14 max-w-7xl mx-auto">
      {/* Page Intro */}
      <PageIntro
        title={`Welcome back, ${session?.user?.username?.split("@")[0] || "User"}`}
        subtitle={
          isAlumni
            ? "Your mentorship and experience are shaping the next generation of KIIT professionals."
            : "Connect with alumni mentors, explore opportunities, and shape your academic and professional journey."
        }
      />

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          label={isAlumni ? "Students Mentored" : "Your Connections"}
          value={overview?.connections?.accepted || 0}
          context={isAlumni ? "Active connections" : "Across domains"}
        />
        <StatCard
          label="Upcoming Events"
          value={overview?.events?.upcoming || 0}
          context="Workshops, talks, and alumni sessions"
        />
        <StatCard
          label="Pending Requests"
          value={overview?.connections?.pending || 0}
          context={isAlumni ? "Students seeking guidance" : "Connect with people"}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section - Mentors/Students */}
        <div className="lg:col-span-2">
          <SectionCard
            title={isAlumni ? "Recent Mentorship Requests" : "Recommended Alumni Mentors"}
            subtitle={
              isAlumni
                ? "Students seeking guidance aligned with your expertise"
                : "Based on your interests and academic profile"
            }
          >
            <div className="space-y-4">
              {isStudent ? (
                // Student sees recommended mentors
                <>
                  {overview?.recommendedMentorsTop2?.mentor1 && (
                    <ProfileCard
                      name={overview.recommendedMentorsTop2.mentor1.name}
                      experience={overview.recommendedMentorsTop2.mentor1.experience}
                      org={overview.recommendedMentorsTop2.mentor1.currentCompany}
                      skills={overview.recommendedMentorsTop2.mentor1.interests?.slice(0, 3) || []}
                      action="Request"
                      profileImage={overview.recommendedMentorsTop2.mentor1.profileImage}
                      linkedinUrl={overview.recommendedMentorsTop2.mentor1.linkedinUrl}
                    />
                  )}

                  {overview?.recommendedMentorsTop2?.mentor2 && (
                    <ProfileCard
                      name={overview.recommendedMentorsTop2.mentor2.name}
                      experience={overview.recommendedMentorsTop2.mentor2.experience}
                      org={overview.recommendedMentorsTop2.mentor2.currentCompany}
                      skills={overview.recommendedMentorsTop2.mentor2.interests?.slice(0, 3) || []}
                      action="Request"
                      profileImage={overview.recommendedMentorsTop2.mentor2.profileImage}
                      linkedinUrl={overview.recommendedMentorsTop2.mentor2.linkedinUrl}
                    />
                  )}
                  {!overview?.recommendedMentorsTop2?.mentor1 &&
                    !overview?.recommendedMentorsTop2?.mentor2 && (
                      <p className="text-gray-500 text-center py-8">
                        No recommended mentors at the moment. Complete your profile or change your
                        interests.
                      </p>
                    )}
                  <Link
                    href={"/dashboard/connections"}
                    className="text-sm text-green-700 cursor-pointer"
                  >
                    View all matches →
                  </Link>
                </>
              ) : (
                // Alumni sees student requests
                <>
                  {overview?.studentRequestsTop2?.student1 && (
                    <ProfileCard
                      name={overview.studentRequestsTop2.student1.name}
                      role="Student"
                      org="KIIT"
                      skills={overview.studentRequestsTop2.student1.interests?.slice(0, 3) || []}
                      action="Accept"
                      profileImage={overview.studentRequestsTop2.student1.profileImage}
                      linkedinUrl={overview.studentRequestsTop2.student1.linkedinUrl}
                    />
                  )}

                  {overview?.studentRequestsTop2?.student2 && (
                    <ProfileCard
                      name={overview.studentRequestsTop2.student2.name}
                      role="Student"
                      org="KIIT"
                      skills={overview.studentRequestsTop2.student2.interests?.slice(0, 3) || []}
                      action="Accept"
                      profileImage={overview.studentRequestsTop2.student2.profileImage}
                      linkedinUrl={overview.studentRequestsTop2.student2.linkedinUrl}
                    />
                  )}

                  {!overview?.studentRequestsTop2?.student1 &&
                    !overview?.studentRequestsTop2?.student2 && (
                      <p className="text-gray-500 text-center py-8">
                        No pending mentorship requests at the moment.
                      </p>
                    )}
                </>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Right Section - Upcoming Events */}
        <SectionCard title="Upcoming Events" subtitle="Workshops, talks, and alumni sessions">
          <div className="space-y-3">
            {overview?.events?.top2UpcomingEvents?.event1 && (
              <EventCard
                title={overview.events.top2UpcomingEvents.event1.name}
                date={new Date(overview.events.top2UpcomingEvents.event1.date).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              />
            )}

            {overview?.events?.top2UpcomingEvents?.event2 && (
              <EventCard
                title={overview.events.top2UpcomingEvents.event2.name}
                date={new Date(overview.events.top2UpcomingEvents.event2.date).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              />
            )}

            {!overview?.events?.top2UpcomingEvents?.event1 &&
              !overview?.events?.top2UpcomingEvents?.event2 && (
                <p className="text-gray-500 text-center py-4 text-sm">
                  No upcoming events scheduled.
                </p>
              )}

            <Link
              href="/dashboard/events"
              className="text-sm text-green-700 cursor-pointer hover:text-green-800 transition-colors"
            >
              View all events →
            </Link>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// Loading Skeleton Component
function DashboardSkeleton() {
  return (
    <div className="space-y-14 animate-pulse">
      {/* Page Intro Skeleton */}
      <div>
        <div className="h-10 bg-gray-200 rounded w-64 mb-3"></div>
        <div className="h-5 bg-gray-200 rounded w-96"></div>
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mb-6"></div>

            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-full shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="h-9 bg-gray-200 rounded-lg w-24"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="h-6 bg-gray-200 rounded w-36 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-6"></div>

            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-xl">
                  <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              ))}
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
