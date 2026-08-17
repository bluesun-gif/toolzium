import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SpotifyPlaylistClient from "@/components/tools/social/spotify-playlist-client";

const TITLE = "Spotify Playlist Title & Aesthetic Description Studio | Toolzium";
const DESCRIPTION = "Generate aesthetic Spotify playlist titles, mood descriptions, and lofi/indie/gym cover text.";
const PATH = "/tools/social/spotify-playlist-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Spotify Playlist Title & Aesthetic Description Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SpotifyPlaylistClient />
    </>
  );
}
