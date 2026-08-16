import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SocialBioClient from "@/components/tools/ai/social-bio-client";
<<<<<<< HEAD
export const metadata = {
  title: "AI Social Media Bio & Creator Profile Generator Studio | Toolzium",
  description: "Generate high-converting, aesthetic bios for Instagram, TikTok, Twitter/X, and LinkedIn with 1-click vibe controls.",
};

export default function SocialBioPage() {
  return (
    <><SocialBioClient />
      <RelatedTools currentToolUrl="/tools/ai/social-bio" />
=======

export const metadata = buildMetadata({
  title: "AI Social Media Bio Generator — Free Instagram, Twitter & TikTok Bio Writer",
  description:
    "Generate high-converting, aesthetic bios for Instagram, TikTok, Twitter/X, and LinkedIn with 1-click vibe controls.",
  path: "/tools/ai/social-bio",
  keywords: [
    "ai bio generator",
    "social media bio generator",
    "instagram bio generator ai",
    "twitter bio writer",
    "tiktok bio generator",
    "free creator bio builder",
  ],
});

export default function SocialBioPage() {
  const jsonLd = buildToolJsonLd({
    name: "AI Social Media Bio Generator",
    description:
      "Generate high-converting, aesthetic bios for Instagram, TikTok, Twitter/X, and LinkedIn with 1-click vibe controls.",
    path: "/tools/ai/social-bio",
    categoryName: "AI Tools",
    categoryPath: "/tools/ai",
    faqs: [
      {
        question: "How does the AI Social Bio Generator work?",
        answer:
          "Enter your niche, personal brand keywords, or target platform. The AI generates tailored, high-converting bio options with emojis and call-to-action links.",
      },
      {
        question: "Which platforms are supported?",
        answer:
          "Bios are customized for Instagram (150 char limit), Twitter/X (160 char limit), TikTok (80 char limit), and LinkedIn headline profiles.",
      },
      {
        question: "Is this bio generator free?",
        answer:
          "Yes, Toolzium's AI Social Bio Generator is 100% free with unlimited bio options generated.",
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SocialBioClient />
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
    </>
  );
}
