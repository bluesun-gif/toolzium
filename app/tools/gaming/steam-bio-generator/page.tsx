import { Metadata } from "next";
import SteamBioClient from "@/components/tools/gaming/steam-bio-client";

export const metadata: Metadata = {
  title: "Steam Profile Bio & Layout Decorator | Toolzium",
  description:
    "Generate aesthetic Steam profile bios, hardware spec boxes, CS2/Dota 2 rank tags, and custom artwork spacers with live AI inference.",
};

export default function SteamBioPage() {
  return <SteamBioClient />;
}
