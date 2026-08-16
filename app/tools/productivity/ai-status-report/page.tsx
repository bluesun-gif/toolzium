import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiStatusReportClient from "@/components/tools/productivity/ai-status-report-client";
<<<<<<< HEAD
export const metadata: Metadata = {
  title: "AI Executive Weekly Status Report Generator | Toolzium",
  description:
    "Convert weekly task notes, completed tickets, and blockers into structured executive status reports for stakeholders with live AI.",
};

export default function AiStatusReportPage() {
  return (
    <><AiStatusReportClient />
      <RelatedTools currentToolUrl="/tools/productivity/ai-status-report" />
    </>
=======

export const metadata = buildMetadata({
  title: "AI Executive Weekly Status Report Generator",
  description: "Convert weekly task notes, completed tickets, and blockers into structured executive status reports for stakeholders with live AI.",
  path: "/tools/productivity/ai-status-report",
  keywords: ["weekly", "into", "convert", "status", "reports", "notes", "executive", "tickets", "completed", "structured", "blockers", "task"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Executive Weekly Status Report Generator",
    description: "Convert weekly task notes, completed tickets, and blockers into structured executive status reports for stakeholders with live AI.",
    path: "/tools/productivity/ai-status-report",
    categoryName: "Productivity",
    categoryPath: "/tools/productivity",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiStatusReportClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
