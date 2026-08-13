import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LinkedinHeadlineClient from "@/components/tools/social/linkedin-headline-client";

export const metadata = buildMetadata({
  title: "LinkedIn Viral Post & Headline Hook Generator",
  description: "Generate high-converting LinkedIn profile headlines, B2B hooks, and viral storytelling formats with live AI inference.",
  path: "/tools/social/linkedin-headline-generator",
  keywords: ["hooks", "storytelling", "with", "profile", "generate", "viral", "converting", "linkedin", "headlines", "formats", "live", "high"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "LinkedIn Viral Post & Headline Hook Generator",
    description: "Generate high-converting LinkedIn profile headlines, B2B hooks, and viral storytelling formats with live AI inference.",
    path: "/tools/social/linkedin-headline-generator",
    categoryName: "Social",
    categoryPath: "/tools/social",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <LinkedinHeadlineClient />
    </div>
  );
}
