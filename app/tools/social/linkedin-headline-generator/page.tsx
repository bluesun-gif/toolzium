import { Metadata } from "next";
import LinkedinHeadlineClient from "@/components/tools/social/linkedin-headline-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "LinkedIn Viral Post Format & Headline Hook Generator | Toolzium",
  description:
    "Generate high-converting LinkedIn profile headlines, B2B hooks, and viral storytelling formats with live AI inference.",
};

export default function LinkedinHeadlinePage() {
  return (
    <><LinkedinHeadlineClient />
      <RelatedTools currentToolUrl="/tools/social/linkedin-headline-generator" />
    </>
  );
}
