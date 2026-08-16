import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MorseAudioClient from "@/components/tools/fun/morse-audio-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Morse Code Audio | Toolzium",
  description: "Convert text to Morse code with audio playback. Listen and learn.",
  path: "/tools/fun/morse-audio",
  keywords: ["with", "learn", "convert", "audio", "morse", "playback", "text", "listen", "code"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Morse Code Audio",
    description: "Convert text to Morse code with audio playback. Listen and learn.",
    path: "/tools/fun/morse-audio",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MorseAudioClient />
    
      <RelatedTools currentToolUrl="/tools/fun/morse-audio" />
</div>
  );
}
