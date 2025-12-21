import PageIntro from "@/component/PageIntro";
import StatCard from "@/component/StatCard";
import SectionCard from "@/component/SectionCard";
import ProfileCard from "@/component/ProfileCard";

export default function AlumniDashboard() {
  return (
    <div className="space-y-14">
      <PageIntro
        title="Welcome back, Shivam"
        subtitle="Your mentorship and experience are shaping the next generation of KIIT professionals."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard label="Students Mentored" value="18" context="Across programs" />
        <StatCard label="Mentorship Sessions" value="42" context="Last 12 months" />
        <StatCard label="Profile Visibility" value="127" context="Student views" />
      </div>

      <SectionCard
        title="Mentorship Requests"
        subtitle="Students seeking guidance aligned with your expertise"
      >
        <div className="space-y-4">
          <ProfileCard
            name="Rohan Singh"
            role="B.Tech CSE"
            org="3rd Year"
            action="Accept"
          />
          <ProfileCard
            name="Ananya Patel"
            role="B.Tech IT"
            org="Final Year"
            action="Accept"
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Your Recent Contributions"
        subtitle="How you’ve engaged with the KIIT community"
      >
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
          <li>Hosted alumni session on careers in Big Tech</li>
          <li>Reviewed 12 student resumes</li>
          <li>Participated in KIIT alumni panel</li>
        </ul>
      </SectionCard>
    </div>
  );
}
