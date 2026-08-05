import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/dashboard/profile-form";
import ProfileHeader from "@/components/dashboard/profile-header";

export const metadata: Metadata = {
  title: "Profile Settings | Toolzium",
  description: "Manage your profile settings and account information",
};

export default async function ProfileSettingsPage() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = {
    id: session.user.id,
    name: session.user.name || null,
    email: session.user.email,
    emailVerified: session.user.emailVerified || false,
  };

  return (
    <div className="space-y-6">
      <ProfileHeader />
      <ProfileForm user={user} />
    </div>
  );
}
