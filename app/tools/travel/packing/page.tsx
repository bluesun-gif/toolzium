import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PackingChecklistClient from "@/components/tools/travel/packing-checklist-client";

export const metadata = buildMetadata({
  title: "Travel Packing Checklist",
  description: "Smart packing list generator for trips. Customizable travel checklist based on destination, duration, and season. Never forget essential items when traveling.",
  path: "/tools/travel/packing",
  keywords: ["travel", "based", "destination", "list", "duration", "packing", "generator", "season", "trips", "customizable", "checklist", "smart"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Travel Packing Checklist",
    description: "Smart packing list generator for trips. Customizable travel checklist based on destination, duration, and season. Never forget essential items when traveling.",
    path: "/tools/travel/packing",
    categoryName: "Travel",
    categoryPath: "/tools/travel",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PackingChecklistClient />
    </div>
  );
}
