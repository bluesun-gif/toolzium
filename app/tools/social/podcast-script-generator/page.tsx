import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PodcastScriptGeneratorClient from "@/components/tools/social/podcast-script-generator-client";
import { siteURL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "AI Podcast Episode Script & Show Notes Studio | Toolzium",
  description:
    "Generate episode intro scripts, guest interview question frameworks, sponsor reads, and publishing show notes using live AI.",
  path: "/tools/social/podcast-script-generator",
  keywords: [
    "podcast script generator",
    "podcast intro generator",
    "ai podcast writer",
    "podcast show notes",
    "podcast script ai",
    "episode script generator",
  ],
});

export default function PodcastScriptGeneratorPage() {
  const toolUrl = `${siteURL}/tools/social/podcast-script-generator`;

  const jsonLd = buildToolJsonLd({
    name: "AI Podcast Script Generator",
    description:
      "Generate episode intro scripts, guest interview question frameworks, sponsor reads, and publishing show notes using live AI.",
    path: "/tools/social/podcast-script-generator",
    categoryName: "Social Media Tools",
    categoryPath: "/tools/social",
  });

  return (
    <div className="space-y-4">
      <JsonLd data={jsonLd[0]} />
      <JsonLd data={jsonLd[1]} />
      <JsonLd data={jsonLd[2]} />
      <PodcastScriptGeneratorClient />
    </div>
  );
}
