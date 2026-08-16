import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ResumeSummaryGeneratorClient from "@/components/tools/writing/resume-summary-generator-client";
<<<<<<< HEAD
export const metadata: Metadata = {
  title: "AI Executive Resume Summary & Bullet Point Generator | Toolzium",
  description:
    "Craft high-impact resume professional summaries, experience bullet points, and ATS-friendly keywords powered by live AI.",
};

export default function ResumeSummaryGeneratorPage() {
  return (
    <><ResumeSummaryGeneratorClient />
      <RelatedTools currentToolUrl="/tools/writing/resume-summary-generator" />
    </>
=======

export const metadata = buildMetadata({
  title: "AI Executive Resume Summary & Bullet Point Generator",
  description: "Craft high-impact resume professional summaries, experience bullet points, and ATS-friendly keywords powered by live AI.",
  path: "/tools/writing/resume-summary-generator",
  keywords: ["summaries", "points", "professional", "powered", "craft", "keywords", "bullet", "impact", "resume", "friendly", "experience", "high"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Executive Resume Summary & Bullet Point Generator",
    description: "Craft high-impact resume professional summaries, experience bullet points, and ATS-friendly keywords powered by live AI.",
    path: "/tools/writing/resume-summary-generator",
    categoryName: "Writing",
    categoryPath: "/tools/writing",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ResumeSummaryGeneratorClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
