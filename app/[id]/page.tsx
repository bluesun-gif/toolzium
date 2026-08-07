import type { Metadata } from "next";
import { recordClickAndRedirect } from "@/lib/actions/shortener.action";
import { generateSEOMetadata } from "@/lib/seo-config";
import AdminDashboardClient from "@/components/admin/admin-dashboard-client";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  if (id.toLowerCase() === "admin") {
    return {
      title: "Owner & Admin Control Panel | Toolzium",
      description: "Real-time audience traffic analytics, tool usage leaderboards, user accounts, and system status for Toolzium.",
      robots: { index: false, follow: false },
    };
  }
  return generateSEOMetadata({
    title: "Redirecting...",
    description: "You are being redirected through Toolzium's secure URL shortener.",
    noIndex: true,
  });
}

export default async function ShortCatchAll({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;

  // Reserved system routes fallback
  if (id.toLowerCase() === "admin") {
    return <AdminDashboardClient />;
  }

  const sParams = await searchParams;
  const rawSrc = sParams?.src || sParams?.source || sParams?.ref;
  const customSource = Array.isArray(rawSrc) ? rawSrc[0] : rawSrc;
  await recordClickAndRedirect(id, customSource);
  return null;
}
