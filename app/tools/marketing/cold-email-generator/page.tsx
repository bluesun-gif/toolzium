import { Metadata } from "next";
import ColdEmailGeneratorClient from "@/components/tools/marketing/cold-email-generator-client";
export const metadata: Metadata = {
  title: "AI Cold Email & B2B Sales Outreach Sequence Generator | Toolzium",
  description:
    "Craft high-reply B2B cold email campaigns, personalized sales pitches, and follow-up templates powered by live AI.",
};

export default function ColdEmailGeneratorPage() {
  return (
    <><ColdEmailGeneratorClient />
      <RelatedTools currentToolUrl="/tools/marketing/cold-email-generator" />
    </>
  );
}
