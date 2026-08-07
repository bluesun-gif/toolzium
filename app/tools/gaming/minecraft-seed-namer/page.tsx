import { Metadata } from "next";
import MinecraftSeedClient from "@/components/tools/gaming/minecraft-seed-client";

export const metadata: Metadata = {
  title: "Minecraft Seed & World Name Generator | Toolzium",
  description:
    "Generate fantasy Minecraft world titles, 100 Days Hardcore SMP names, and cottagecore village ideas with live AI inference.",
};

export default function MinecraftSeedPage() {
  return <MinecraftSeedClient />;
}
