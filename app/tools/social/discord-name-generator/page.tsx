import { Metadata } from "next";
import DiscordNameClient from "@/components/tools/social/discord-name-client";

export const metadata: Metadata = {
  title: "Discord Server Name & Channel Layout Studio | Toolzium",
  description:
    "Generate aesthetic Discord server names, channel symbols (│・welcome), category headers, and role layouts for Gaming, Anime, and Chill communities.",
};

export default function DiscordNamePage() {
  return <DiscordNameClient />;
}
