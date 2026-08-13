import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColdEmailGeneratorClient from "@/components/tools/marketing/cold-email-generator-client";

export const metadata = buildMetadata({
  title: "AI Cold Email & B2B Sales Outreach Sequence Generator",
  description: "Craft high-reply B2B cold email campaigns, personalized sales pitches, and follow-up templates powered by live AI.",
  path: "/tools/marketing/cold-email-generator",
  keywords: ["campaigns", "sales", "personalized", "powered", "craft", "templates", "email", "follow", "high", "reply", "pitches", "cold"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Cold Email & B2B Sales Outreach Sequence Generator",
    description: "Craft high-reply B2B cold email campaigns, personalized sales pitches, and follow-up templates powered by live AI.",
    path: "/tools/marketing/cold-email-generator",
    categoryName: "Marketing",
    categoryPath: "/tools/marketing",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ColdEmailGeneratorClient />
    </div>
  );
}
