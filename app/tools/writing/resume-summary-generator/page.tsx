import { Metadata } from "next";
import ResumeSummaryGeneratorClient from "@/components/tools/writing/resume-summary-generator-client";
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
  );
}
