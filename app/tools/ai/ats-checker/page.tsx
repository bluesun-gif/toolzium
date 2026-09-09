import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AtsCheckerClient from "@/components/tools/ai/ats-checker-client";

const TITLE = "ATS Resume Checker [Free] — Score, Keywords & Instant Fixes";
const DESCRIPTION =
  "✅ 100% free • No signup • Private analysis • Score your resume against any job description, find missing keywords, and fix formatting before recruiters do.";
const PATH = "/tools/ai/ats-checker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "ats resume checker",
    "resume score",
    "ats optimization",
    "resume keywords",
    "cv checker",
  ],
});

const FAQS = [
  { question: "Is this ATS resume checker really free?",
    answer: "Yes, 100% free forever. No credit card, no signup, unlimited resume scans." },
  { question: "Do you store my resume?",
    answer: "No. Your resume and job description are analyzed in-browser and never uploaded or retained." },
  { question: "What does the report include?",
    answer: "An ATS compatibility score, missing/overused keywords vs the target job description, section detection issues, and formatting fixes." },
  { question: "How accurate is the score?",
    answer: "It mirrors the keyword and parsing logic used by major ATS platforms (Taleo, Greenhouse, Lever, Workday). Always pair it with a human review." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Resume & ATS Compatibility Checker",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AtsCheckerClient />
    </>
  );
}
