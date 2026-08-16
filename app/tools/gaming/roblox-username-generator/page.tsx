import { Metadata } from "next";
import RobloxUsernameClient from "@/components/tools/gaming/roblox-username-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "Roblox Username & Display Name Generator (Rare & Aesthetic) | Toolzium",
  description:
    "Generate cool, aesthetic, 4-letter rare, goth, and PvP Roblox usernames and display names with 1-click availability check.",
};

export default function RobloxUsernamePage() {
  return (
    <><RobloxUsernameClient />
      <RelatedTools currentToolUrl="/tools/gaming/roblox-username-generator" />
    </>
  );
}
