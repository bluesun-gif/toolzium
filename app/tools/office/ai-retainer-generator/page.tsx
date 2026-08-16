import { Metadata } from "next";
import AiRetainerGeneratorClient from "@/components/tools/office/ai-retainer-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "AI Client Retainer & Scope Proposal Generator | Toolzium",
  description:
    "Craft recurring monthly client retainer proposals, service allocation tiers, SLA guarantees, and overage terms with live AI.",
};

export default function AiRetainerGeneratorPage() {
  return (
    <><AiRetainerGeneratorClient />
      <RelatedTools currentToolUrl="/tools/office/ai-retainer-generator" />
    </>
  );
}
