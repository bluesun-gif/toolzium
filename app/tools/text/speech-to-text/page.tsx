import JsonLd from "@/components/seo/json-ld";
export const metadata: Metadata = generateSEOMetadata({
  title: "Speech to Text Transcriber — Free Voice Typing Online",
  description:
    "Free online Speech to Text voice typing tool. Dictate, transcribe speech, and convert voice to text in real-time. Choose from multiple languages, copy, edit, or download your transcriptions.",
  path: "/tools/text/speech-to-text",
  keywords: ["speech", "with", "convert", "spoken", "time", "transcriber", "online", "voice", "free", "real", "text"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Speech to Text Transcriber",
    description: "Convert speech and spoken voice to text in real-time. Free online voice transcriber with language selections, live editor, and text copy/download actions.",
    path: "/tools/text/speech-to-text",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SpeechToTextClient />
    
      <RelatedTools currentToolUrl="/tools/text/speech-to-text" />
</>
  );
}
