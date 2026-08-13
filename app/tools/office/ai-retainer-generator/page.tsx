import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiRetainerGeneratorClient from "@/components/tools/office/ai-retainer-generator-client";

export const metadata = buildMetadata({
  title: "AI Client Retainer & Scope Proposal Generator",
  description: "Craft recurring monthly client retainer proposals, service allocation tiers, SLA guarantees, and overage terms with live AI.",
  path: "/tools/office/ai-retainer-generator",
  keywords: ["client", "retainer", "overage", "terms", "allocation", "craft", "service", "tiers", "monthly", "guarantees", "proposals", "recurring"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Client Retainer & Scope Proposal Generator",
    description: "Craft recurring monthly client retainer proposals, service allocation tiers, SLA guarantees, and overage terms with live AI.",
    path: "/tools/office/ai-retainer-generator",
    categoryName: "Office",
    categoryPath: "/tools/office",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiRetainerGeneratorClient />
    </div>
  );
}
