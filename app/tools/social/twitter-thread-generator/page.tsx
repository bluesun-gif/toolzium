import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TwitterThreadGeneratorClient from "@/components/tools/social/twitter-thread-generator-client";

export const metadata = buildMetadata({
  title: "AI X / Twitter Viral Thread Generator",
  description: "Generate high-converting 1st-tweet opening hooks, actionable storytelling tweets, and viral CTA tweets powered by live AI.",
  path: "/tools/social/twitter-thread-generator",
  keywords: ["hooks", "storytelling", "tweets", "generate", "powered", "tweet", "opening", "viral", "converting", "actionable", "high"],
});

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
  );
}
