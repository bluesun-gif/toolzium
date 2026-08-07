import { Metadata } from "next";
import AdCopyGeneratorClient from "@/components/tools/social/ad-copy-generator-client";

export const metadata: Metadata = {
  title: "AI Facebook & Instagram Ad Copy Studio | Toolzium",
  description:
    "Generate high-converting Meta primary text, headlines, and call-to-action variants using PAS, AIDA, and Social Proof frameworks.",
};

export default function AdCopyGeneratorPage() {
  return <AdCopyGeneratorClient />;
}
