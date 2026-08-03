import { Metadata } from "next";
import ClientComponent from "@/components/tools/text/translate-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Translate Text Online — Free Language Translator",
  description: "Translate text between 100+ languages online for free. Auto-detect source language, swap languages, listen with text-to-speech. Fast translation tool.",
  path: "/tools/text/translate",
});

export default function TranslatePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What languages are supported for translation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support over 20 popular languages including English, Spanish, French, German, Chinese, Japanese, Arabic, and more."
        }
      },
      {
        "@type": "Question",
        name: "Is the translation service free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our tool provides free translations using a reliable third-party translation API (MyMemory)."
        }
      },
      {
        "@type": "Question",
        name: "How is my privacy handled?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Translations happen directly between your browser and the translation API. We do not store your original text or translations on our servers, though your browser may save your local history."
        }
      }
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <ClientComponent />
    </>
  );
}
