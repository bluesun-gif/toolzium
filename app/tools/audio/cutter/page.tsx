import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AudioCutterClient from "@/components/tools/audio/audio-cutter-client";

const TITLE = "In-Browser Audio Waveform Cutter & Ringtone Studio | Toolzium";
const DESCRIPTION = "Cut, trim, fade, and edit audio files (MP3, WAV, OGG, M4A) with live waveform visualization and instant export. 100% free with in-browser privacy.";
const PATH = "/tools/audio/cutter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "audio cutter",
    "mp3 cutter online",
    "ringtone maker",
    "audio trimmer",
    "cut mp3 free",
    "waveform audio editor",
    "fade in fade out audio",
    "free online music cutter",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "In-Browser Audio Waveform Cutter & Ringtone Studio",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AudioCutterClient />
    </>
  );
}
