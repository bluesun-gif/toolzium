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

export default function TwitterThreadGeneratorPage() {
  return (
    <><TwitterThreadGeneratorClient />
      <RelatedTools currentToolUrl="/tools/social/twitter-thread-generator" />
    </>
  );
}
