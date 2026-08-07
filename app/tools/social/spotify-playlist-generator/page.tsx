import { Metadata } from "next";
import SpotifyPlaylistClient from "@/components/tools/social/spotify-playlist-client";

export const metadata: Metadata = {
  title: "Spotify Playlist Title & Aesthetic Description Studio | Toolzium",
  description:
    "Generate aesthetic Spotify playlist titles, mood descriptions, and lofi/indie/gym cover text.",
};

export default function SpotifyPlaylistPage() {
  return <SpotifyPlaylistClient />;
}
