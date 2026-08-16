import JsonLd from "@/components/seo/json-ld";
export const metadata: Metadata = generateSEOMetadata({
  title: "Text to Speech (TTS) Reader — Online Natural Voices",
  description:
    "Free online Text to Speech (TTS) converter tool. Turn text into clear, natural-sounding audio voice narration. Adjust speech rate, pitch, and choose from multiple languages and browser voices.",
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
    
      <RelatedTools currentToolUrl="/tools/text/text-to-speech" />
</>
  );
}
