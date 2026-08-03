import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile Settings | Toolzium",
  description: "Manage your profile settings and account information",
};

export default function ProfileSettingsPage() {
  redirect("/");
}
