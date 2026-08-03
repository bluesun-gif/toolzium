import { Metadata } from "next";
import NotepadClient from "@/components/tools/productivity/notepad-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Online Notepad — Free Text Editor No Signup",
  description: "Free online notepad that auto-saves to your browser. Multiple tabs, dark mode, word count, download as .txt. No signup, works offline. Notes stay private.",
  path: "/tools/productivity/notepad",
});

export default function NotepadPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does this notepad save my work automatically?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our online notepad auto-saves your text directly to your browser's local storage every few seconds. Even if you accidentally close the tab, your notes will be there when you return.",
        },
      },
      {
        "@type": "Question",
        name: "Are my notes private and secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. All notes are saved entirely on your device (in your browser's local storage). No data is sent to our servers, ensuring complete privacy.",
        },
      },
      {
        "@type": "Question",
        name: "Does this tool work offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, since the application runs entirely in your browser and saves data locally, you can continue typing and saving notes even if you lose your internet connection.",
        },
      }
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <NotepadClient />
    </>
  );
}
