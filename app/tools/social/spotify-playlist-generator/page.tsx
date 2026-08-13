import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SpotifyPlaylistClient from "@/components/tools/social/spotify-playlist-client";
import { siteURL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Spotify Playlist Title & Aesthetic Description Studio | Toolzium",
  description:
    "Generate aesthetic Spotify playlist titles, mood descriptions, and lofi/indie/gym cover text.",
  path: "/tools/social/spotify-playlist-generator",
  keywords: [
    "spotify playlist generator",
    "spotify playlist name",
    "spotify playlist title",
    "ai playlist generator",
    "lofi playlist name",
    "spotify playlist description",
  ],
});

export default function SpotifyPlaylistPage() {
  const toolUrl = `${siteURL}/tools/social/spotify-playlist-generator`;

  const jsonLd = buildToolJsonLd({
    name: "Spotify Playlist Generator",
    description:
      "Generate aesthetic Spotify playlist titles, mood descriptions, and lofi/indie/gym cover text.",
    path: "/tools/social/spotify-playlist-generator",
    categoryName: "Social Media Tools",
    categoryPath: "/tools/social",
  });

  return (
    <div className="space-y-4">
      <JsonLd data={jsonLd[0]} />
      <JsonLd data={jsonLd[1]} />
      <JsonLd data={jsonLd[2]} />
      <SpotifyPlaylistClient />
    </div>
  );
}
