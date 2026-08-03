import { Metadata } from "next";
import ClientComponent from "@/components/tools/util/screen-recorder-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Screen Recorder Online — Record Screen Free",
  description: "Record your screen online for free. Capture screen, window, or tab with optional mic audio. Download as WebM. No install, 100% browser-based screen recorder.",
  path: "/tools/util/screen-recorder",
});

export default function ScreenRecorderPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which browsers support this online screen recorder?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our screen recorder works on modern desktop browsers that support the Screen Capture API, including Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari.",
        },
      },
      {
        "@type": "Question",
        name: "What quality does it record in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool records at your screen's native resolution and frame rate, provided your system and browser can handle it. The final output is a high-quality WebM video file.",
        },
      },
      {
        "@type": "Question",
        name: "Is my recording private and secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, 100% private. All recording and processing happen entirely within your browser on your device. No video data is ever sent to or stored on our servers.",
        },
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
