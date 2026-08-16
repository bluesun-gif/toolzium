import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WeekNumberClient from "@/components/tools/time/week-number-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Week Number Calculator",
  description: "Find ISO week number for any date. Week number calculator with date range display. Useful for project planning and scheduling with week-based calendars.",
  path: "/tools/time/weekno",
  keywords: ["useful", "with", "display", "calculator", "number", "find", "range", "week", "date"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Week Number Calculator",
    description: "Find ISO week number for any date. Week number calculator with date range display. Useful for project planning and scheduling with week-based calendars.",
    path: "/tools/time/weekno",
    categoryName: "Time",
    categoryPath: "/tools/time",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <WeekNumberClient />
    
      <RelatedTools currentToolUrl="/tools/time/weekno" />
</div>
  );
}
