import { Metadata } from "next";
import YoutubeScriptClient from "@/components/tools/ai/youtube-script-client";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";
const TITLE = "AI YouTube Script Generator & Teleprompter Studio | Toolzium";
const DESCRIPTION = "Generate viral YouTube video titles, 15-second opening retention hooks, video timestamp outlines, and teleprompter-ready scripts.";
const PATH = "/tools/ai/youtube-script";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "AI YouTube script generator",
    "YouTube hook generator",
    "viral video title generator",
    "teleprompter script writer",
    "free YouTube AI tool",
  ],
});

export default function YoutubeScriptPage() {
  const jsonLdData = buildToolJsonLd({
    name: "AI YouTube Script Generator",
    description: DESCRIPTION,
    path: PATH,
    categoryName: "AI Tools",
    categoryPath: "/tools/ai",
    faqs: [
      {
        question: "How does the AI YouTube Script Generator work?",
        answer: "It uses Groq AI models to generate viral titles, 15-second opening hooks, timestamp outlines, and teleprompter scripts.",
      },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLdData as any} />
      <YoutubeScriptClient />
    
      <RelatedTools currentToolUrl="/tools/ai/youtube-script" />
</>
  );
}
