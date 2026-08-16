import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiRetainerGeneratorClient from "@/components/tools/office/ai-retainer-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI Client Retainer & Scope Proposal Generator",
  description: "Craft recurring monthly client retainer proposals, service allocation tiers, SLA guarantees, and overage terms with live AI.",
  path: "/tools/office/ai-retainer-generator",
  keywords: ["client", "retainer", "overage", "terms", "allocation", "craft", "service", "tiers", "monthly", "guarantees", "proposals", "recurring"],
});

export default function AiRetainerGeneratorPage() {
  return (
    <><AiRetainerGeneratorClient />
      <RelatedTools currentToolUrl="/tools/office/ai-retainer-generator" />
    </>
  );
}
