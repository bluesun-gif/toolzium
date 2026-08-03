import { Metadata } from "next";
import ClientComponent from "@/components/tools/text/character-counter-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Character Counter — Count Letters & Words Online",
  description: "Count characters, words, sentences, paragraphs in real-time. Check social media limits for Twitter/X, Instagram, LinkedIn, TikTok. Free character counter tool.",
  path: "/tools/text/character-counter",
});

export default function CharacterCounterPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How are words and characters counted?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Characters are counted by the individual letters, numbers, and symbols in your text, with and without spaces. Words are counted by groups of characters separated by spaces or punctuation."
        }
      },
      {
        "@type": "Question",
        name: "What are the social media character limits?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Different platforms have varying limits. For example, Twitter/X has a 280-character limit, Instagram captions allow up to 2,200 characters, and LinkedIn posts can have up to 3,000 characters."
        }
      },
      {
        "@type": "Question",
        name: "Is this tool different from a basic word counter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, besides word count, it provides real-time social media limit tracking, reading time, speaking time, and most used words frequency analysis."
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
