import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TwitterThreadGeneratorClient from "@/components/tools/social/twitter-thread-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI X / Twitter Viral Thread Generator",
  description: "Generate high-converting 1st-tweet opening hooks, actionable storytelling tweets, and viral CTA tweets powered by live AI.",
  path: "/tools/social/twitter-thread-generator",
  keywords: ["hooks", "storytelling", "tweets", "generate", "powered", "tweet", "opening", "viral", "converting", "actionable", "high"],
});

<<<<<<< HEAD
export default function TwitterThreadGeneratorPage() {
  return (
    <><TwitterThreadGeneratorClient />
      <RelatedTools currentToolUrl="/tools/social/twitter-thread-generator" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI X / Twitter Viral Thread Generator",
    description: "Generate high-converting 1st-tweet opening hooks, actionable storytelling tweets, and viral CTA tweets powered by live AI.",
    path: "/tools/social/twitter-thread-generator",
    categoryName: "Social",
    categoryPath: "/tools/social",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TwitterThreadGeneratorClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
