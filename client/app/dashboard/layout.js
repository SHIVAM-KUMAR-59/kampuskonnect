import Sidebar from "@/component/Sidebar";
import Topbar from "@/component/Topbar";
import { ToastProvider } from "@/context/ToastContext";

export default function DashboardLayout({ children }) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <div className="flex flex-col flex-1">
          {/* <Topbar /> */}
          <main className="p-6 md:p-8">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
