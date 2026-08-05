import { Metadata } from "next";
import PdfChatClient from "@/components/tools/ai/pdf-chat-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "AI Document Intelligence & Text Summarizer — Free Document Tool",
  description: "Extract instant bullet summaries, key action points, and get direct answers from any long article, report, or document text.",
  path: "/tools/ai/pdf-chat",
});

export default function PdfChatPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I ask custom questions about my document?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can ask any question regarding your uploaded document content and get direct answers.",
        },
      },
      {
        "@type": "Question",
        name: "Is there any document length limit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can paste long-form articles, reports, meeting minutes, and research text without restrictions.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <PdfChatClient />
    </>
  );
}
