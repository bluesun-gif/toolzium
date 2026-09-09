import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmailSubjectGeneratorClient from "@/components/tools/writing/email-subject-generator-client";

const TITLE = "Email Subject Line Generator [Free] — 20+ High-Open Variants";
const DESCRIPTION =
  "✅ 100% free • No signup • Instant ideas • Generate curiosity, urgency, and benefit-driven subject lines with character-count preview & A/B variants.";
const PATH = "/tools/writing/email-subject-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "email subject line generator",
    "subject line ideas",
    "cold email subjects",
    "email marketing tools",
  ],
});

const FAQS = [
  { question: "Is this email subject generator really free?",
    answer: "Yes, 100% free forever. No credit card, no signup, unlimited generations." },
  { question: "Do you store my campaign ideas?",
    answer: "No. Inputs and generated subject lines are not saved or shared." },
  { question: "What styles does it generate?",
    answer: "Curiosity-gap, urgency, number-led, personalization-token, and question formats — each within inbox-safe character limits for mobile previews." },
  { question: "Will these actually raise open rates?",
    answer: "They apply tested copywriting patterns; real gains depend on your list. Use the built-in preview to A/B test 2–3 variants per send." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Email Subject Line Generator",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EmailSubjectGeneratorClient />
    </>
  );
}
