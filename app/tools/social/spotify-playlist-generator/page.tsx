import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SpotifyPlaylistClient from "@/components/tools/social/spotify-playlist-client";
import RelatedTools from "@/components/shared/related-tools";

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
  return (
    <><SpotifyPlaylistClient />
      <RelatedTools currentToolUrl="/tools/social/spotify-playlist-generator" />
    </>
  );
}
