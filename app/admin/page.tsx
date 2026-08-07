import { Metadata } from "next";
import AdminDashboardClient from "@/components/admin/admin-dashboard-client";

export const metadata: Metadata = {
  title: "Owner & Admin Control Panel | Toolzium",
  description: "Real-time audience traffic analytics, tool usage leaderboards, user accounts, and system status for Toolzium.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
