import StudentDashboard from "./student-dashboard";
import AlumniDashboard from "./alumni-dashboard";

const role = "STUDENT"; // replace with session.role later

export default function DashboardPage() {
  return role === "STUDENT" ? <StudentDashboard /> : <AlumniDashboard />;
}
