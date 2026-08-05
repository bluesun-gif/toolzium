import { Metadata } from "next";
import AtsCheckerClient from "@/components/tools/ai/ats-checker-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "AI Resume & ATS Compatibility Checker — Free Resume Score Tool",
  description: "Calculate your ATS match score against target job descriptions, find missing keywords, and optimize your resume to land interviews.",
  path: "/tools/ai/ats-checker",
});

export default function AtsCheckerPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an ATS match score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An ATS (Applicant Tracking System) match score measures how closely your resume keywords and experience align with a specific job posting.",
        },
      },
      {
        "@type": "Question",
        name: "Is my resume data kept private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your resume content is analyzed locally in your browser session and is never stored or shared with external recruiters.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <AtsCheckerClient />
    </>
  );
}
