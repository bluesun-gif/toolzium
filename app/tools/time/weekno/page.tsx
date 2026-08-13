import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WeekNumberClient from "@/components/tools/time/week-number-client";

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
    </div>
  );
}
