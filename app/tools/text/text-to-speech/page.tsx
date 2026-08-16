import JsonLd from "@/components/seo/json-ld";
<<<<<<< HEAD
export const metadata: Metadata = generateSEOMetadata({
  title: "Text to Speech (TTS) Reader — Online Natural Voices",
  description:
    "Free online Text to Speech (TTS) converter tool. Turn text into clear, natural-sounding audio voice narration. Adjust speech rate, pitch, and choose from multiple languages and browser voices.",
=======
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextToSpeechClient from "@/components/tools/text/text-to-speech-client";

export const metadata = buildMetadata({
  title: "Text to Speech Reader",
  description: "Convert text to clear, natural-sounding audio speech online. Select from multiple languages, voices, adjustments for speed and pitch. Completely free and secure.",
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  path: "/tools/text/text-to-speech",
  keywords: ["select", "sounding", "speech", "from", "natural", "clear", "convert", "audio", "online", "languages", "text", "multiple"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Text to Speech Reader",
    description: "Convert text to clear, natural-sounding audio speech online. Select from multiple languages, voices, adjustments for speed and pitch. Completely free and secure.",
    path: "/tools/text/text-to-speech",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TextToSpeechClient />
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/text/text-to-speech" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
