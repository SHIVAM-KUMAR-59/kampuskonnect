"use client"
import PageIntro from "@/component/PageIntro"
import StatCard from "@/component/StatCard"
import SectionCard from "@/component/SectionCard"
import ProfileCard from "@/component/ProfileCard"
import Sidebar from "@/component/Sidebar"

export default function AlumniDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onLogout={() => console.log("Signed out")} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-20 lg:pt-0">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          <div className="relative space-y-12">
            {/* Page Intro */}
            <div className="animate-fade-in">
              <PageIntro
                title="Welcome back, Shivam"
                subtitle="Your mentorship and experience are shaping the next generation of KIIT professionals."
              />
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <StatCard label="Students Mentored" value="18" context="Across programs" />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <StatCard label="Mentorship Sessions" value="42" context="Last 12 months" />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <StatCard label="Profile Visibility" value="127" context="Student views" />
              </div>
            </div>

            {/* Mentorship Requests Section */}
            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <SectionCard title="Mentorship Requests" subtitle="Students seeking guidance aligned with your expertise">
                <div className="space-y-4">
                  <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <ProfileCard
                      name="Rohan Singh"
                      role="B.Tech CSE"
                      org="3rd Year"
                      skills={["Web Development", "AI/ML", "Backend"]}
                      action="Accept"
                    />
                  </div>
                  <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
                    <ProfileCard
                      name="Ananya Patel"
                      role="B.Tech IT"
                      org="Final Year"
                      skills={["Cloud Computing", "DevOps", "Databases"]}
                      action="Accept"
                    />
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* Recent Contributions Section */}
            <div className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <SectionCard title="Your Recent Contributions" subtitle="How you've engaged with the KIIT community">
                <ul className="text-base text-gray-700 space-y-3 list-none">
                  {[
                    "Hosted alumni session on careers in Big Tech",
                    "Reviewed 12 student resumes",
                    "Participated in KIIT alumni panel",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 group animate-fade-in"
                      style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                    >
                      <span className="w-2 h-2 bg-green-600 rounded-full group-hover:scale-125 transition-transform" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
