import PageIntro from "@/component/PageIntro";
import StatCard from "@/component/StatCard";
import SectionCard from "@/component/SectionCard";
import ProfileCard from "@/component/ProfileCard";
import EventCard from "@/component/EventCard";

export default function StudentDashboard() {
  return (
    <div className="space-y-14">
      <PageIntro
        title="Welcome, Mauli"
        subtitle="Connect with alumni mentors, explore opportunities, and shape your academic and professional journey."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard label="Available Mentors" value="42" context="Across domains" />
        <StatCard label="Upcoming Events" value="6" context="Next 30 days" />
        <StatCard label="Your Interests" value="5" context="Used for matching" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <SectionCard
            title="Recommended Alumni Mentors"
            subtitle="Based on your interests and academic profile"
          >
            <div className="space-y-4">
              <ProfileCard
                name="Ankit Sharma"
                role="Software Engineer"
                org="Google"
                skills={["DSA", "System Design", "Backend"]}
                action="Request"
              />
              <ProfileCard
                name="Neha Verma"
                role="Product Manager"
                org="Amazon"
                skills={["Product", "UX", "Analytics"]}
                action="Request"
              />
            </div>
          </SectionCard>
        </div>

        <SectionCard
          title="Upcoming Events"
          subtitle="Workshops, talks, and alumni sessions"
        >
          <div className="space-y-3">
            <EventCard title="Alumni Tech Talk" date="25 Sept 2025" />
            <EventCard title="Resume Review Workshop" date="2 Oct 2025" />
            <p className="text-sm text-green-700 cursor-pointer">
              View all events →
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
