import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeScriptGeneratorClient from "@/components/tools/social/youtube-script-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI YouTube Video Script & Outline Generator — Free Retention Script Writer",
  description:
    "Generate high-retention 5-second opening hooks, B-roll cues, step-by-step value scripts, and high-CTR calls to action using live AI.",
  path: "/tools/social/youtube-script-generator",
  keywords: [
    "youtube script generator",
    "ai youtube script writer",
    "video outline generator",
    "high retention youtube script",
    "youtube video hook generator",
  ],
});

export default function YoutubeScriptGeneratorPage() {
<<<<<<< HEAD
  return (
    <><YoutubeScriptGeneratorClient />
      <RelatedTools currentToolUrl="/tools/social/youtube-script-generator" />
=======
  const jsonLd = buildToolJsonLd({
    name: "AI YouTube Video Script Generator",
    description:
      "Generate high-retention 5-second opening hooks, B-roll cues, step-by-step value scripts, and high-CTR calls to action using live AI.",
    path: "/tools/social/youtube-script-generator",
    categoryName: "Social Media",
    categoryPath: "/tools/social",
    faqs: [
      {
        question: "How does the AI YouTube Script Generator work?",
        answer:
          "Enter your video topic, select your audience tone and video duration. The AI generates a complete 4-part script: 5-second pattern interrupt hook, visual B-roll cues, main value breakdown, and a high-CTR call to action.",
      },
      {
        question: "Is this YouTube script writer 100% free to use?",
        answer:
          "Yes! Toolzium's AI YouTube Script Generator is completely free with unlimited script generations and no sign-up or credit card required.",
      },
      {
        question: "Can I customize the generated script for different video lengths?",
        answer:
          "Yes, you can generate structured scripts optimized for YouTube Shorts (under 60s), 5-minute tutorials, 10-minute deep dives, or long-form documentary scripts.",
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <YoutubeScriptGeneratorClient />
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
    </>
  );
}
