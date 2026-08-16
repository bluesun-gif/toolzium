import { Metadata } from "next";
import AtsCheckerClient from "@/components/tools/ai/ats-checker-client";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";
const TITLE = "AI Resume & ATS Compatibility Checker — Free Resume Score Tool | Toolzium";
const DESCRIPTION =
  "Calculate your ATS match score against target job descriptions, find missing keywords, and optimize your resume to land interviews.";
const PATH = "/tools/ai/ats-checker";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "ATS resume checker",
    "resume match score",
    "free ATS scanner",
    "resume keyword optimizer",
    "job description match score",
    "resume audit online",
  ],
});

export default function AtsCheckerPage() {
  const jsonLdData = buildToolJsonLd({
    name: "AI Resume & ATS Checker",
    description: DESCRIPTION,
    path: PATH,
    categoryName: "AI Tools",
    categoryPath: "/tools/ai",
    faqs: [
      {
        question: "What is an ATS match score?",
        answer:
          "An ATS (Applicant Tracking System) match score measures how closely your resume keywords and experience align with a specific job posting.",
      },
      {
        question: "Is my resume data kept private?",
        answer:
          "Yes, your resume content is analyzed locally in your browser session and is never stored or shared with external recruiters.",
      },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLdData as any} />
      <AtsCheckerClient />
    </>
  );
}
