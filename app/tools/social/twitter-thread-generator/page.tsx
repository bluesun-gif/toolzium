import { Metadata } from "next";
import TwitterThreadGeneratorClient from "@/components/tools/social/twitter-thread-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "AI X / Twitter Viral Thread Generator | Toolzium",
  description:
    "Generate high-converting 1st-tweet opening hooks, actionable storytelling tweets, and viral CTA tweets powered by live AI.",
};

export default function TwitterThreadGeneratorPage() {
  return (
    <><TwitterThreadGeneratorClient />
      <RelatedTools currentToolUrl="/tools/social/twitter-thread-generator" />
    </>
  );
}
