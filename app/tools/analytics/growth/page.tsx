/**
 * ADMIN-ONLY: Toolzium Growth Analytics Dashboard
 *
 * This is a Server Component that:
 *  1. Checks the user's session server-side (no flash of content)
 *  2. Verifies the logged-in email matches ADMIN_EMAIL env var
 *  3. Redirects any non-admin visitor to the home page with no data leakage
 *  4. Renders the private dashboard only for the verified owner
 */
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import GrowthDashboardClient from "./growth-dashboard-client";

export const metadata = {
  title: "Growth Analytics — Admin Only | Toolzium",
  description: "Private internal analytics dashboard for site owners.",
  robots: "noindex, nofollow", // Never index this page in Google
};

export default async function GrowthAnalyticsPage() {
  // ── Server-side admin auth gate ─────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    // If no ADMIN_EMAIL is configured → block everyone
    redirect("/");
  }

  let session: Awaited<ReturnType<typeof auth.api.getSession>> = null;
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch {
    // Session fetch failure → treat as unauthenticated
  }

  const userEmail = session?.user?.email;

  if (!userEmail || userEmail !== adminEmail) {
    // Not logged in or not the admin → send to sign-in
    // We redirect to sign-in so there is ZERO data rendered for public users
    redirect("/sign-in?next=/tools/analytics/growth");
  }
  // ────────────────────────────────────────────────────────────────────

  // Only the owner reaches this point — render the private dashboard
  return <GrowthDashboardClient />;
}
