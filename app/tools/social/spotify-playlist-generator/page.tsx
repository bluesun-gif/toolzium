import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SpotifyPlaylistClient from "@/components/tools/social/spotify-playlist-client";
<<<<<<< HEAD
import RelatedTools from "@/components/shared/related-tools";
=======
import { siteURL } from "@/lib/constants";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

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
<<<<<<< HEAD
  return (
    <><SpotifyPlaylistClient />
      <RelatedTools currentToolUrl="/tools/social/spotify-playlist-generator" />
=======
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpotifyPlaylistClient />
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
    </>
  );
}
