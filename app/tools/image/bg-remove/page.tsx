import { Metadata } from "next";
import ClientComponent from "@/components/tools/image/bg-remove-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Background Remover — Remove Image Background Free",
  description: "Remove background from images instantly using AI in your browser. Get transparent PNG backgrounds for free. No signup, no upload to servers. 100% private.",
  path: "/tools/image/bg-remove",
});

export default function BgRemovePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the background remover work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It uses an advanced AI model loaded directly into your browser to identify the main subject and remove the background seamlessly.",
        }
      },
      {
        "@type": "Question",
        name: "Is it safe and private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Everything happens locally on your device. Your images are never sent to any external server.",
        }
      },
      {
        "@type": "Question",
        name: "What output format will I get?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool generates a transparent PNG file so you can easily place your subject on a different background later.",
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
