import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LinkedinHeadlineClient from "@/components/tools/social/linkedin-headline-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "LinkedIn Viral Post & Headline Hook Generator",
  description: "Generate high-converting LinkedIn profile headlines, B2B hooks, and viral storytelling formats with live AI inference.",
  path: "/tools/social/linkedin-headline-generator",
  keywords: ["hooks", "storytelling", "with", "profile", "generate", "viral", "converting", "linkedin", "headlines", "formats", "live", "high"],
});

export default function LinkedinHeadlinePage() {
  return (
    <><LinkedinHeadlineClient />
      <RelatedTools currentToolUrl="/tools/social/linkedin-headline-generator" />
    </>
  );
}
