import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DistanceClient from "@/components/tools/travel/distance-client";

export const metadata = buildMetadata({
  title: "Distance Calculator",
  description: "Calculate distance and estimated travel time between cities on a map. Interactive distance calculator with driving, walking, and straight-line distance. Plan your trips and routes.",
  path: "/tools/travel/distance",
  keywords: ["travel", "interactive", "calculate", "estimated", "between", "with", "time", "driving", "distance", "cities", "calculator"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Distance Calculator",
    description: "Calculate distance and estimated travel time between cities on a map. Interactive distance calculator with driving, walking, and straight-line distance. Plan your trips and routes.",
    path: "/tools/travel/distance",
    categoryName: "Travel",
    categoryPath: "/tools/travel",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <DistanceClient />
    </div>
  );
}
