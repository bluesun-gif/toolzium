import { Metadata } from "next";
import TwitterThreadGeneratorClient from "@/components/tools/social/twitter-thread-generator-client";

export const metadata: Metadata = {
  title: "AI X / Twitter Viral Thread Generator | Toolzium",
  description:
    "Generate high-converting 1st-tweet opening hooks, actionable storytelling tweets, and viral CTA tweets powered by live AI.",
};

export default function TwitterThreadGeneratorPage() {
  return <TwitterThreadGeneratorClient />;
}
