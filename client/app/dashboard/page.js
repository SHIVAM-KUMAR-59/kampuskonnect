import StudentDashboard from "./student-dashboard";
import AlumniDashboard from "./alumni-dashboard";

const role = "STUDENT"; // later from session

export default function DashboardPage() {
  return role === "STUDENT" ? <StudentDashboard /> : <AlumniDashboard />;
}
